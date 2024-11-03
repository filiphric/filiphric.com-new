
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, firstName } = req.body

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Email and firstName are required' })
  }

  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/1673359/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
        first_name: firstName
      })
    })

    const data = await response.json()

    if (!data.subscription) {
      return res.status(400).json({ error: 'Subscription failed' })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
} 