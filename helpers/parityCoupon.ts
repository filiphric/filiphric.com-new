import ppp from '../constants/ppp.json'

const DISCOUNT_UPPER_BOUND = 0.55
const DISCOUNT_LOWER_BOUND = 0.25

export const getPPPDiscountPercent = (countryCode: string) => {
  const ratio: number = ppp[countryCode as keyof typeof ppp]

  if (!ratio) { return 0 }

  const percentOff = calculatePercentOff(ratio)

  if (percentOff === 0) { return 0 }

  return percentOff
}

const calculatePercentOff = (ratio: number) => {
  const discount = roundTo05(1 - ratio)

  if (discount < DISCOUNT_LOWER_BOUND) { return 0 }

  if (discount >= DISCOUNT_UPPER_BOUND) {
    return DISCOUNT_UPPER_BOUND
  }

  return discount
}

const roundTo05 = (decimal: number) => {
  return Math.round(decimal * 20) / 20
}
