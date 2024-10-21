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
      console.error('Error fetching guardian:', error)
      throw error
    }
  },

  async createChild(guardianId, childData) {
    try {
      const response = await fetch(
        `${BASE_URL}/guardians/${guardianId}/children`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            ...childData,
            guardian: guardianId
          })
        }
      )
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
    try {
      const response = await fetch(
        `${BASE_URL}/guardians/${guardianId}/children/${childId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'DELETE'
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete child')
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting child: ', error)
    }
  },
  // HTTP Method Overriding with query parameters POST --> PUT
  async updateGuardian(id, guardianData) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${id}?_method=PUT`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guardianData)
      })

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

  async deleteAllChildren(guardianId) {
    try {
      const response = await fetch(
        `${BASE_URL}/guardians/${guardianId}/children`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'DELETE'
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete children')
      }
    } catch (error) {
      console.error('Error deleting child: ', error)
    }
  },
  async deleteGuardian(id) {
    try {
      const response = await fetch(`${BASE_URL}/guardians/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `Failed to delete guardian with id ${id}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting guardian:', error)
      throw error
    }
  }
}
