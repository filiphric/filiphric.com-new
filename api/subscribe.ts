/* eslint-disable camelcase */
export default async (req: any, res: any) => {
  const { email_address, first_name } = req.body

  const response = await fetch(`https://api.convertkit.com/v3/forms/1673359/subscribe?api_key=${process.env.CONVERTKIT_API_KEY}&email=${encodeURIComponent(email_address)}`, {
    method: 'POST',
    body: JSON.stringify({
      email_address,
      first_name
    })
  })

  const data = await response.json()

  if (data.error !== undefined) {
    return res.status(400)
  }

  return res.status(200).json({ data })
}
