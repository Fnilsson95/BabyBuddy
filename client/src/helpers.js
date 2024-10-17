// Format date: YYYY-MM-DD

export const formatDate = (dateString) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Calculates the difference in hours between two dates
export const calculateDuration = (startDateTime, endDateTime) => {
  const start = new Date(startDateTime)
  const end = new Date(endDateTime)

  const durationMs = end - start

  const durationHours = durationMs / (1000 * 60 * 60)

  return Math.round(durationHours * 100) / 100
}

// Function that checks if a date is this month or not

export const isThisMonth = (inputDate) => {
  const date = new Date(inputDate)

  const now = new Date()

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  )
}
