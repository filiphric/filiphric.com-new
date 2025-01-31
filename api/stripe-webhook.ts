import Stripe from 'stripe';
import { buffer } from 'micro';
import { getServiceSupabase } from '../utils/supabase';

export const config = {
  api: { bodyParser: false }
};

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2024-10-28.acacia'
  });
  
  const signature = req.headers['stripe-signature'];
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!signature || !signingSecret) {
    return res.status(400).json({ error: 'Missing signature or signing secret' });
  }

  const reqBuffer = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Webhook error: ${errorMessage}`);
    return res.status(400).json({ error: `Webhook Error: ${errorMessage}` });
  }

  try {
    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer;
        
        if (!customerId) {
          throw new Error('No customer ID found in session');
        }

        // Get admin-level Supabase client
        const supabase = getServiceSupabase

        // Find user_id from profiles table using stripe_customer
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer', customerId)
          .single();

        if (profileError || !profileData) {
          throw new Error(`No profile found for customer ${customerId}`);
        }

        // Get course ID from metadata
        const courseId = session.metadata?.courseId;
        if (!courseId) {
          throw new Error('No course ID found in session metadata');
        }

        // Insert into user_courses table
        const { error: insertError } = await supabase
          .from('user_courses')
          .insert({
            user_id: profileData.id,
            course_id: courseId,
            stripe_session_id: session.id
          })
          .single();

        if (insertError) {
          throw new Error(`Error inserting course purchase: ${insertError.message}`);
        }

        console.log(`Course purchase recorded for user ${profileData.id}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error processing webhook: ${errorMessage}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;