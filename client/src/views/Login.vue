<template>
  <div class="sign-in-container">
    <nav class="navbar">BabyBuddy</nav>
    <div class="toast-wrapper">
      <Toast :config-toast="toastConfig" />
    </div>

    <div class="sign-in-content">
      <div class="sign-in-box">
        <div class="header-box">
          <h2>Welcome back!</h2>
        </div>
        <form @submit.prevent="handleLogin">
          <h3>Sign In</h3>
          <div class="register">
            <div class="input-group">
              <label for="email">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button type="submit">Sign In</button>
            <hr class="line" />
          </div>
        </form>

        <!-- Redirect to signup -->
        <div class="create-account">
          <p>Don't have an account?</p>
          <router-link to="/signup" class="create-account-btn">Create Account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/v1/login'
import Toast from '@/components/Toast.vue'

export default {
  name: 'Login',
  components: {
    Toast
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      toastConfig: {
        title: '',
        body: '',
        variant: '',
        show: false
      }
    }
  },
  setup() {
    const router = useRouter()

    return {
      router
    }
  },
  methods: {
    showToast(title, body, variant) {
      this.toastConfig = { title, body, variant, show: true }
    },
    async handleLogin() {
      try {
        const payload = {
          email: this.email,
          password: this.password
        }

        // Send login request to the API
        const response = await loginApi.login(payload)

        // Extract user ID and role from the response
        const { userId: id, role } = response

        // Check role and redirect accordingly, including the user ID in the URL
        if (role === 'guardian') {
          this.$router.push({ name: 'guardian', params: { id } })
        } else if (role === 'babysitter') {
          this.$router.push({ name: 'babysitter', params: { id } })
        } else {
          throw new Error('Invalid role')
        }
        this.showToast('Success', 'Login successful', 'success')
      } catch (error) {
        this.errorMessage =
          error.message || 'Invalid email or password. Please try again.'
        this.showToast('Error', this.errorMessage, 'danger')

        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.sign-in-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e0f7e9;
  position: relative;
}

.navbar {
  background-color: #2f4f4f;
  color: white;
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 19.5px;
  font-weight: 600;
}

.sign-in-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in-box {
  background-color: #ffffff;
  padding: 2rem;
  text-align: center;
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header-box {
  border: 1px solid #3c5c5e;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: #f0f4f8;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  border: none;
  border-radius: 5px;
  padding: 0.75rem;
  background-color: #3c5c5e;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #2f4f4f;
}

.create-account {
  margin-top: 1rem;
}

.create-account-btn {
  background-color: #ffffff;
  color: #2f4f4f;
  padding: 0.5rem 1rem;
  border: 2px solid #2f4f4f;
  border-radius: 5px;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
}

.create-account-btn:hover {
  background-color: #2f4f4f;
  color: white;
}

@media (max-width: 600px) {
  .sign-in-box {
    padding: 1rem;
    border-radius: 10px;
  }
}
</style>
