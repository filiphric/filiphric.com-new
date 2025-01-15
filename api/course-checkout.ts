// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const hostUrl = process.env.NODE_ENV === 'production' ? 'https://filiphric.com' : 'http://localhost:3000'

export default async (req: any, res: any) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [req.body.order],
    mode: 'payment',
    customer: req.body.customer_id,
    metadata: req.body.metadata,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    invoice_creation: { enabled: true },
    success_url: `${hostUrl}${req.body.redirectPath}?success=true&course=${req.body.metadata.courseId}`,
    cancel_url: `${hostUrl}${req.body.redirectPath}?success=false&course=${req.body.metadata.courseId}`
  })

  return res.status(200).json({ url: session.url })
}
