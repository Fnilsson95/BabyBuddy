const BASE_URL = 'http://localhost:3001/api/v1'

export const guardianApi = {
  async getGuardian(id) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch Guardian Data')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async createGuardian(guardianData) {
    try {
      const response = await fetch(`${BASE_URL}/guardians`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(guardianData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create guardian')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating guardian: ', error)
      throw error
    }
  },

  // HTTP Method Overriding with query parameters POST --> PUT
  async updateGuardian(id, guardianData) {
    try {
      const response = await fetch(
        `${BASE_URL}/guardians/${id}?_method=PUT`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(guardianData)
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update Guardian')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating Guardian: ', error)
      throw error
    }
  },

  async deleteGuardian(id) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete guardian with id ${id}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting guardian:', error)
      throw error
    }
  }
}
