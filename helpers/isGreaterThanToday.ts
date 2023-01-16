export const isGreaterThanToday = (date: string): boolean => {
  const inputDate = new Date(date)
  if (!inputDate) {
    return false
  }

  const today = new Date()

  return inputDate <= today
}
