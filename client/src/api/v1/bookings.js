const BASE_URL = 'http://localhost:3001/api/v1'

// http://localhost:3000/api/bookings?page=1&limit=1

export const bookingApi = {

  async createBooking(bookingData) {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(bookingData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create booking')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating booking: ', error)
      throw error
    }
  },

  async getAllPendingBookings() {
    try {
      const response = await fetch(`${BASE_URL}/bookings/pending`)
      if (response.status === 404) {
        return []
      }
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async getBabysitterBookings(babysitterId) {
    try {
      const response = await fetch(
        `${BASE_URL}/babysitters/${babysitterId}/bookings`
      )
      if (response.status === 404) {
        return []
      }
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const result = await response.json()

      return result
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
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async getAllGuardianBookings(
    guardianId,
    page = 1,
    limit = 10,
    sort = 'startDateTime',
    order = 'asc'
  ) {
    try {
      const response = await fetch(
        `${BASE_URL}/guardians/${guardianId}/bookings?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get all bookings')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  },

  async getAllBabysitterBookings(
    babysitterId,
    page = 1,
    limit = 10,
    sort = 'startDateTime',
    order = 'asc'
  ) {
    try {
      const response = await fetch(
        `${BASE_URL}/babysitters/${babysitterId}/bookings?page=${page}&limit=${limit}&sort=${sort}&order=${order}`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get all bookings')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching bookings: ', error)
      throw error
    }
  },
  async deleteBooking(bookingId, babysitterId) {
    try {
      const response = await fetch(
        `${BASE_URL}/babysitters/${babysitterId}/bookings/${bookingId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'DELETE'
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      return { success: true }
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }
}
