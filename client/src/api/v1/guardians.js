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
      console.error('Error fetching guardian:', error)
      throw error
    }
  },

  async createChild(guardianId, childData) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${guardianId}/children`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          ...childData,
          guardian: guardianId
        })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create child')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating child: ', error)
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

  async deleteChild(guardianId, childId) {
    console.log("childId:", childId);
    console.log("guardianId:", guardianId);
    try {
      const response = await fetch(`${BASE_URL}/guardians/${guardianId}/children/${childId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete child')
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting child: ', error)
      throw error
    }
  },

  async deleteAllChildren(guardianId) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${guardianId}/children`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete children')
      }
    } catch (error) {
      console.error('Error deleting child: ', error)
      throw error
    }
  }
}