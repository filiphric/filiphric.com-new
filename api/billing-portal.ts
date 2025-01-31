// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const hostUrl = process.env.NODE_ENV === 'production' ? 'https://filiphric.com' : 'http://localhost:3000'

export default async (req: any, res: any) => {
  try {
    const { userId, customer } = req.body;

    if (!userId || !customer) {
      return res.status(400).json({ error: 'Both User ID and customer ID are required' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${hostUrl}/profile`,
    });

    res.send({
      url: session.url,
    });
  } catch (error: any) {
    console.error('Billing portal error:', error);
    res.status(500).json({ 
      error: 'Failed to create billing portal session',
      message: error?.message || 'Unknown error occurred'
    });
  }
}
