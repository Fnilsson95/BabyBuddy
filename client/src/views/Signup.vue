<template>
  <div class="signup-container">
    <nav class="navbar">BabyBuddy</nav>

    <div class ="toast-wrapper">
    <Toast :config-toast="toastConfig" />
    </div>

    <div class="signup-content">
      <div class="signup-box">
        <div class="welcome-message">
          <h2>Welcome to <br> Baby Buddy!</h2>
        </div>
        <div class="role-selection">
          <h3>Choose Your Role</h3>
          <div class="role-options">
            <label>
              <input type="radio" name="role" value="guardian" v-model="role" />
              Guardian
            </label>
            <label>
              <input type="radio" name="role" value="babysitter" v-model="role" />
              Babysitter
            </label>
          </div>
        </div>
        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <input
              type="email"
              placeholder="Email"
              v-model="userDetails.email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              v-model="userDetails.password"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <input
                type="text"
                placeholder="First Name"
                v-model="userDetails.firstName"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Last Name"
                v-model="userDetails.lastName"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                v-model="userDetails.phoneNumber"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="date"
                placeholder="Date of Birth"
                v-model="userDetails.dateOfBirth"
                required
              />
            </div>
          </div>
          <div v-if="role === 'guardian'">
            <div class="form-group">
              <input
                type="text"
                placeholder="City"
                v-model="userDetails.location.city"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Country"
                v-model="userDetails.location.country"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Address"
                v-model="userDetails.location.address"
                required
              />
            </div>
          </div>
          <div v-if="role === 'babysitter'">
            <div class="form-group">
              <input
                type="number"
                placeholder="Hourly Rate (SEK)"
                v-model="userDetails.hourlyRate"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                placeholder="Experience (Years)"
                v-model="userDetails.experience"
                required
              />
            </div>
          </div>
          <button type="submit" class="btn-primary">Create Account</button>
        </form>
        <hr class="line" />
        <div class="signin-link">
          <p>Already have an account?</p>
          <router-link to="/login" class="btn-secondary">Sign In</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { guardianApi } from '@/api/v1/guardians'
import { babysitterAPI } from '@/api/v1/babysitter'
import Toast from '@/components/Toast.vue'

export default {
  name: 'Signup',
  components: {
    Toast
  },
  data() {
    return {
      role: null,
      userDetails: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        location: {
          city: '',
          country: '',
          address: ''
        },
        hourlyRate: null,
        experience: null
      },
      successMessage: null,
      errorMessage: null,
      toastConfig: {
        title: '',
        body: '',
        variant: '',
        show: false
      }
    }
  },
  methods: {
    showToast(title, body, variant) {
      this.toastConfig = { title, body, variant, show: true }
    },
    async handleSignup() {
      try {
        const payload = JSON.parse(JSON.stringify(this.userDetails))

        if (typeof payload.phoneNumber !== 'string') {
          payload.phoneNumber = String(payload.phoneNumber)
        }

        let result
        if (this.role === 'babysitter') {
          result = await babysitterAPI.createBabysitter(payload)
        } else if (this.role === 'guardian') {
          delete payload.hourlyRate
          delete payload.experience
          result = await guardianApi.createGuardian(payload)
        } else {
          throw new Error('Please select a role!')
        }

        this.successMessage = result.message
        this.errorMessage = null
        this.showToast('Success', this.successMessage, 'success')
        this.resetForm()
      } catch (error) {
        this.errorMessage = error.message || 'Error creating account. Please try again.'
        this.successMessage = null
        this.showToast('Error', this.errorMessage, 'danger')
        console.error(error)
      }
    },
    resetForm() {
      this.role = ''
      this.userDetails = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        location: {
          city: '',
          country: '',
          address: ''
        },
        hourlyRate: null,
        experience: null
      }
    }
  }
}
</script>

<style scoped>
/* General Styles */
.signup-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #e0f7e9;
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

.signup-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-message {
  text-align: center;
  margin-bottom: 1.5rem;
}

.welcome-message h2 {
  border: 1px solid #3c5c5e;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: #f0f4f8;  border: 1px solid #3c5c5e;
}

.welcome-message p {
  color: #555;
}

.role-selection {
  text-align: center;
  margin-bottom: 1.5rem;
}

.role-selection h3 {
  margin-bottom: 0.5rem;
  color: #2f4f4f;
}

.role-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.role-options label {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #2f4f4f;
}

.role-options input[type='radio'] {
  margin-right: 0.5rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group input::placeholder {
  color: #aaa;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.btn-primary {
  background-color: #2f4f4f;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-primary:hover {
  background-color: #3c5c5e;
}

.signin-link {
  text-align: center;
  margin-top: 2.5rem;
}

.signin-link p {
  margin-bottom: 0.5rem;
  color: #555;
}

.btn-secondary {
  background-color: #ffffff;
  color: #2f4f4f;
  padding: 0.5rem 1rem;
  border: 2px solid #2f4f4f;
  border-radius: 5px;
  font-size: 16px;
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: #2f4f4f;
  color: white;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
