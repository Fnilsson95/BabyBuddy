const BASE_URL = 'http://localhost:3001/api/v1'

export const childApi = {
  async getChild(id) {
    try {
      const response = await fetch(`${BASE_URL}/children/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching child:', error)
      throw error
    }
  },
  async updateChild(id, childData) {
    try {
      const response = await fetch(`${BASE_URL}/children/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(childData)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating child:', error)
      throw error
    }
  }
}
