// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const hostUrl = process.env.NODE_ENV === 'production' ? 'https://filiphric.com' : 'http://localhost:3000'

export default async (req: any, res: any) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [req.body.order],
    mode: 'payment',
    payment_intent_data: {
      metadata: req.body.metadata,
      description: 'Supplier: Filip Hric, Turnianska 4845/88, 90301 Senec, Slovakia, ID: 50259024, Tax ID: 1084975331, VAT ID: SK1084975331'
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    invoice_creation: { enabled: true },
    success_url: `${hostUrl}/${req.body.metadata.redirectPath}?success=true`,
    cancel_url: `${hostUrl}/${req.body.metadata.redirectPath}?failed=true`
  })

  return res.status(200).json(session)
}
