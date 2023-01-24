export const isGreaterThanToday = (date: string): boolean => {
  const inputDate = new Date(date)
  // @ts-ignore
  if (inputDate === 'Invalid date') {
    return false
  }

  const today = new Date()

  return inputDate >= today
}
