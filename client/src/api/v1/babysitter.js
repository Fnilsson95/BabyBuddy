const BASE_URL = 'http://localhost:3001/api/v1'

export const babysitterAPI = {
  async createBabysitter(babysitterData) {
    try {
      const response = await fetch(`${BASE_URL}/babysitters`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(babysitterData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create babysitter')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating babysitter: ', error)
      throw error
    }
  },

  // HTTP Method Overriding with query parameters POST --> PUT
  async updateBabysitter(babysitterId, babysitterData) {
    try {
      const response = await fetch(
        `${BASE_URL}/babysitters/${babysitterId}?_method=PUT`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(babysitterData)
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update babysitter')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating babysitter: ', error)
      throw error
    }
  }
}
