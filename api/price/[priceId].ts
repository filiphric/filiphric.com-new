// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

export default async (req: any, res: any) => {
  const { priceId } = req.query
  const price = await stripe.prices.retrieve(priceId)

  return res.status(200).json(price)
}
