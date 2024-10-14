const BASE_URL = 'http://localhost:3001/api/v1'

export const loginApi = {
  async login(credentials) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      // Return the JSON response (contains role and id)
      return await response.json()
    } catch (error) {
      console.error('Error loggin in:', error)
      throw error
    }
  }
}
