export const formatDate = (dateString: string) => {
  // Create a new JavaScript Date object based on the dateString
  const date = new Date(dateString)

  // Get the month, and day of the month
  const month = date.getMonth()
  const dayOfMonth = date.getDate()

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]

  // Get the year
  const year = date.getFullYear()

  // Determine the ordinal suffix for the day of the month
  const ordinalSuffix = dayOfMonth === 12 || dayOfMonth === 11
    ? 'th'
    : dayOfMonth % 10 === 1
      ? 'st'
      : dayOfMonth % 10 === 2
        ? 'nd'
        : dayOfMonth % 10 === 3 ? 'rd' : 'th'

  // Return the formatted string
  return `${monthName} ${dayOfMonth}${ordinalSuffix}, ${year}`
}
