import ppp from '../constants/ppp.json'

const DISCOUNT_UPPER_BOUND = 0.55
const DISCOUNT_LOWER_BOUND = 0.25

export const getPPPDiscountPercent = (countryCode: string, options: { lowerBound?: number, upperBound?: number, rounding?: 'half' | 'full' } = { lowerBound: DISCOUNT_LOWER_BOUND, upperBound: DISCOUNT_UPPER_BOUND, rounding: 'half' }) => {
  const ratio: number = ppp[countryCode as keyof typeof ppp]

  if (!ratio) { return 0 }

  console.log(options)

  const percentOff = calculatePercentOff(ratio, options)

  if (percentOff === 0) { return 0 }

  return percentOff
}

const calculatePercentOff = (ratio: number, options: { lowerBound?: number, upperBound?: number, rounding?: 'half' | 'full' } = { lowerBound: DISCOUNT_LOWER_BOUND, upperBound: DISCOUNT_UPPER_BOUND, rounding: 'half' }) => {
  const discount = options.rounding === 'half' ? roundTo05(1 - ratio) : roundFull(1 - ratio)

  if (discount < (options.lowerBound || DISCOUNT_LOWER_BOUND)) { return 0 }

  if (discount >= (options.upperBound || DISCOUNT_UPPER_BOUND)) {
    return options.upperBound
  }

  return discount
}

const roundTo05 = (decimal: number) => {
  return Math.round(decimal * 20) / 20
}

const roundFull = (decimal: number) => {
  return Math.round(decimal * 10) / 10
}
