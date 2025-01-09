import Stripe from 'stripe';
import { getServiceSupabase } from '../utils/supabase';

const handler = async (req: any, res: any) => {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
      console.log("route secret was not correct");
      return res.status(401).send("You are not authorized to call this API");
    }

    if (!req.body?.record?.email || !req.body?.record?.id) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ error: 'Missing required fields: email or id' });
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY ?? '', {
      apiVersion: '2024-10-28.acacia'
    });

    let customer;
    try {
      customer = await stripe.customers.create({
        email: req.body.record.email,
        name: req.body.record.full_name,
      });
    } catch (stripeError: any) {
      console.error('Stripe customer creation failed:', stripeError);
      return res.status(500).json({ error: 'Failed to create Stripe customer' });
    }

    try {
      const { data, error } = await getServiceSupabase
        .from("profiles")
        .update({
          stripe_customer: customer.id,
        })
        .eq("id", req.body.record.id)
        .select();

      if (error) {
        console.error('Supabase update failed:', error);
        return res.status(500).json({ error: 'Failed to update profile' });
      }

      return res.status(200).json({ 
        message: `stripe customer created: ${customer.id}`,
        data: data 
      });
    } catch (supabaseError: any) {
      console.error('Supabase update failed:', supabaseError);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

export default handler;