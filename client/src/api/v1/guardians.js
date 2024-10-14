const BASE_URL = 'http://localhost:3001/api/v1'

export const guardianApi = {
  async getGuardian(id) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
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
  }
}
