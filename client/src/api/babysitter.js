const BASE_URL = 'http://localhost:3001/api'

export const babysitterAPI = {
  async getAllBookings(babysitterId) {
    try {
      const response = await fetch(
        `${BASE_URL}/babysitters/${babysitterId}/bookings`
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }
}
