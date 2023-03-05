import { geolocation } from '@vercel/edge'

export const config = {
  runtime: 'edge'
}

export default function (request: Request) {
  const geo = geolocation(request)

  return new Response(JSON.stringify(geo), {
    headers: { 'content-type': 'application/json' }
  })
}
