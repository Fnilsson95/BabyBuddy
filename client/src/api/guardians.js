const BASE_URL = 'http://localhost:3001/api'

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
  }
}
