<template>
  <div class="sign-in-container">
    <div class="navbar">Navbar</div>
    <div class="sign-in-box">
      <div class="header-box">
        <h5>Welcome to Baby Buddy!</h5>
      </div>
      <div class="header-options">
        <h3>Create Account</h3>
        <router-link to="/login" class="link-to-other-page"
          >Sign In</router-link
        >
      </div>
      <div class="choice-box">
        <h6>Choose your role!</h6>
        <div class="radio-group">
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

      <form @submit.prevent="handleSignup" class="scrollable-form">
        <div class="register">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="email"
              v-model="userDetails.email"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              id="password"
              v-model="userDetails.password"
              required
            />
          </div>
          <div class="input-group">
            <label for="firstname">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              id="firstname"
              v-model="userDetails.firstName"
              required
            />
          </div>
          <div class="input-group">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              id="lastname"
              v-model="userDetails.lastName"
              required
            />
          </div>
          <div class="input-group">
            <label for="phonenumber">Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              id="phonenumber"
              v-model="userDetails.phoneNumber"
              required
            />
          </div>
          <div class="input-group">
            <label for="dateofbirth">Date of Birth</label>
            <input
              type="date"
              placeholder="Date of Birth (YY-MM-DD)"
              id="dateofbirth"
              v-model="userDetails.dateOfBirth"
              required
            />
          </div>
          <div class="input-group">
            <label for="city">City</label>
            <input
              type="text"
              placeholder="City"
              id="city"
              v-model="userDetails.location.city"
              required
            />
          </div>
          <div class="input-group">
            <label for="country">Country</label>
            <input
              type="text"
              placeholder="Country"
              id="country"
              v-model="userDetails.location.country"
              required
            />
          </div>
          <div class="input-group">
            <label for="address">Address</label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              v-model="userDetails.location.address"
              required
            />
          </div>

          <!-- Hourly Rate input for Babysitters -->
          <div class="input-group" v-if="role === 'babysitter'">
            <label for="hourlyrate">Hourly Rate</label>
            <input
              type="number"
              placeholder="Hourly Rate kr/h"
              id="hourlyrate"
              v-model="userDetails.hourlyRate"
              required
            />
          </div>

          <button type="submit">Create account</button>
        </div>
      </form>

      <!-- Error Message -->
      <transition name="slide-fade">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </transition>
      <!-- Success Message -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
    <div class="footer_holder">Footer</div>
  </div>
</template>

<script>
import { guardianApi } from '@/api/v1/guardians'
import { babysitterAPI } from '@/api/v1/babysitter'

export default {
  name: 'signup',
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
        hourlyRate: null
      },
      successMessage: null,
      errorMessage: null
    }
  },
  methods: {
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
          result = await guardianApi.createGuardian(payload)
        } else {
          throw new Error('Please select a role!')
        }

        this.successMessage = result.message
        this.errorMessage = null
        this.resetForm()
      } catch (error) {
        this.errorMessage = error || 'Error creating account. Please try again.'
        this.successMessage = null
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
        hourlyRate: null
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
}

.header-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-to-other-page {
  color: #3c5c5e;
  text-decoration: none;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
}

.link-to-other-page:hover {
  text-decoration: underline;
}

.sign-in-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #e0f7e9;
}

.navbar,
.footer_holder {
  background-color: #3c5c5e;
  color: white;
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
}

.header-box {
  border: 1px solid #3c5c5e;
  padding: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  background-color: #f0f4f8;
}

.sign-in-box {
  background-color: #ffffff;
  padding: 2rem;
  text-align: center;
  width: 350px;
  max-height: 500px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
}

.radio-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
}

.radio-group input[type='radio'] {
  margin-right: 0.5rem;
}

.scrollable-form {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  padding-right: 1rem;
}

.register {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0.5rem;
  background-color: #3c5c5e;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

button:hover {
  background-color: #2d4749;
}
</style>
