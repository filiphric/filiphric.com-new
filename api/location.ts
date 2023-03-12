import { geolocation } from '@vercel/edge'
import { getPPPDiscountPercent } from '../helpers/parityCoupon'

export const config = {
  runtime: 'edge'
}

export default function (request: Request) {
  const geo = geolocation(request)
  const country = geo.country || 'IN'
  const amount = getPPPDiscountPercent(country)
  const eligible = amount > 0
  const prices = {
    0: 'price_1MkwcQBnBECxBVfm82qvYyU5',
    0.25: 'price_1MkwcQBnBECxBVfmLS3Ln5Oe',
    0.3: 'price_1MkwcQBnBECxBVfmT9dZZdNv',
    0.35: 'price_1MkwcQBnBECxBVfmtKobZxy8',
    0.4: 'price_1MkwcQBnBECxBVfma87UhGK7',
    0.45: 'price_1MkwcQBnBECxBVfmsptKEgFK',
    0.5: 'price_1MkwcQBnBECxBVfmxWlx1ofL',
    0.55: 'price_1MkwcQBnBECxBVfmX4VNzdba'
  }

  const priceId = prices[amount as keyof typeof prices]

  const result = { country, amount, eligible, priceId }

  return new Response(JSON.stringify(result), {
    headers: { 'content-type': 'application/json' }
  })
}
