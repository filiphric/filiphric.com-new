const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

async function getPlausibleViews(slug: string) {
  const payload = {
    site_id: 'filiphric.com',
    metrics: ['pageviews'],
    date_range: 'all',
    "filters": [
      ["contains", "event:page", [`/${slug}`]]
    ]
  }

  return fetcher('https://plausible.io/api/v2/query', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export default async function handler(req: any, res: any) {
  const { slug } = req.query
  
  if (!slug) {
    return res.status(400).send('Bad request')
  }

  try {
    const data = await getPlausibleViews(String(slug))
    return res.status(200).json({
      views: data?.results?.[0]?.metrics?.[0] || 0
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch views' })
  }
} 