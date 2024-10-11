const BASE_URL = 'http://localhost:3001/api/v1'

// http://localhost:3000/api/bookings?page=1&limit=1

export const bookingApi = {
  async getAllPendingBookings() {
    try {
      const response = await fetch(`${BASE_URL}/bookings/pending`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async confirmBooking(bookingId, babysitterId) {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/${bookingId}/confirm/${babysitterId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT'
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async getAllBookings(page = 1, limit = 10, sort = 'startDateTime', order = 'asc') {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  }
}
