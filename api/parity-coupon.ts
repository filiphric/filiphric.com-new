import { geolocation } from '@vercel/functions'
import { getPPPDiscountPercent } from '../helpers/parityCoupon'

export const config = {
  runtime: 'edge'
}

export default function (request: Request) {
  const geo = geolocation(request)
  const country = geo.country || 'US'
  const amount = getPPPDiscountPercent(country, { lowerBound: 0.2, upperBound: 0.5, rounding: 'full' })
  const eligible = amount && amount > 0
  const coupons = {
    0.2: '99-tips-parity-20',
    0.3: '99-tips-parity-30',
    0.4: '99-tips-parity-40',
    0.5: '99-tips-parity-50',
  }

  const couponId = coupons[amount as keyof typeof coupons]

  const result = { country, amount, eligible, couponId }

  console.log(result)

  return new Response(JSON.stringify(result), {
    headers: { 'content-type': 'application/json' }
  })
}
