<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2>Profile Information</h2>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="modal-body">
        <p>Loading profile data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="modal-body">
        <p>{{ error }}</p>
      </div>

      <!-- Display Profile Information -->
      <div class="modal-body" v-else-if="!isEditing && !isDeleting">
        <!-- Display Profile Data -->
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>First Name:</strong> {{ profile.firstName }}</p>
        <p><strong>Last Name:</strong> {{ profile.lastName }}</p>
        <p><strong>Date of Birth:</strong> {{ profile.dateOfBirth }}</p>
        <p><strong>Phone Number:</strong> {{ profile.phoneNumber }}</p>

        <!-- Additional Fields Based on Role -->
        <div v-if="role === 'babysitter'">
          <p><strong>Experience:</strong> {{ profile.experience }}</p>
          <p><strong>Hourly Rate:</strong> {{ profile.hourlyRate }}</p>
        </div>

        <div v-else-if="role === 'guardian'">
          <p><strong>City:</strong> {{ profile.location?.city }}</p>
          <p><strong>Country:</strong> {{ profile.location?.country }}</p>
          <p><strong>Address:</strong> {{ profile.location?.address }}</p>
        </div>

        <!-- Edit and Delete Buttons -->
        <div class="button-group">
          <button @click="startEditing" class="edit-btn">Edit Profile</button>
          <button @click="confirmDelete" class="delete-btn">Delete Account</button>
        </div>
      </div>

      <!-- Profile Edit Form -->
      <div class="modal-body" v-else-if="isEditing">
        <form @submit.prevent="submitForm">
          <!-- Shared Fields -->
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              v-model="profile.firstName"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              v-model="profile.lastName"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="profile.email"
              required
            />
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              v-model="profile.dateOfBirth"
              required
            />
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="profile.phoneNumber"
              required
            />
          </div>

          <!-- Role-Specific Fields -->
          <div v-if="role === 'babysitter'">
            <div class="form-group">
              <label for="experience">Experience:</label>
              <input
                type="string"
                id="experience"
                v-model="profile.experience"
                required
              />
            </div>

            <div class="form-group">
              <label for="hourlyRate">Hourly Rate:</label>
              <input
                type="number"
                id="hourlyRate"
                v-model="profile.hourlyRate"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div v-else-if="role === 'guardian'">
            <div class="form-group">
              <label for="city">City:</label>
              <input
                type="text"
                id="city"
                v-model="profile.location.city"
                required
              />
            </div>

            <div class="form-group">
              <label for="country">Country:</label>
              <input
                type="text"
                id="country"
                v-model="profile.location.country"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Address:</label>
              <input
                type="text"
                id="address"
                v-model="profile.location.address"
                required
              />
            </div>
          </div>

          <!-- Save and Cancel Buttons -->
          <div class="button-group">
            <button type="submit" class="save-btn">Save Changes</button>
            <button type="button" @click="cancelEditing" class="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Delete Confirmation -->
      <div class="modal-body" v-if="isDeleting">
        <p>Are you sure you want to delete your account?</p>
        <div class="button-group">
          <button @click="deleteAccount" class="confirm-btn">Yes</button>
          <button @click="cancelDelete" class="cancel-btn">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { babysitterAPI } from '../api/v1/babysitter'
import { guardianApi } from '../api/v1/guardians'

export default {
  name: 'ProfileModal',
  data() {
    return {
      isEditing: false, // Track if we're editing profile
      isDeleting: false, // Track if we're confirming deletion
      profile: {},
      isLoading: true,
      error: null,
      id: null,
      role: null
    }
  },

  created() {
    this.extractIdAndRoleFromUrl()
    if (!this.error) {
      this.fetchProfileData()
    } else {
      this.isLoading = false
    }
  },

  methods: {

    extractIdAndRoleFromUrl() {
      // Extract the ID from the URL parameters
      this.id = this.$route.params.id

      // Determine role based on the URL path
      if (this.$route.path.includes('guardian')) {
        this.role = 'guardian'
      } else if (this.$route.path.includes('babysitter')) {
        this.role = 'babysitter'
      }
    },

    async fetchProfileData() {
      try {
        if (this.role === 'babysitter') {
          this.profile = await babysitterAPI.getBabysitter(this.id)
        } else if (this.role === 'guardian') {
          this.profile = await guardianApi.getGuardian(this.id)
        } else {
          throw new Error('Invalid role')
        }
      } catch (error) {
        this.error = 'Failed to load profile data.'
      } finally {
        this.isLoading = false
      }
    },

    startEditing() {
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
    },
    async submitForm() {
      try {
        if (this.role === 'babysitter') {
          await babysitterAPI.updateBabysitter(this.id, this.profile)
        } else if (this.role === 'guardian') {
          await guardianApi.updateGuardian(this.id, this.profile)
        } else {
          throw new Error('Invalid role.')
        }
        this.isEditing = false
      } catch (error) {
        alert(error.message || 'Failed to update profile. Please try again.')
      }
    },
    confirmDelete() {
      this.isDeleting = true
    },
    cancelDelete() {
      this.isDeleting = false
    },

    async deleteAccount() {
      try {
        if (this.role === 'babysitter') {
          await babysitterAPI.deleteBabysitter(this.id)
        } else if (this.role === 'guardian') {
          await guardianApi.deleteGuardian(this.id)
        } else {
          throw new Error('Invalid role.')
        }
        alert('Account deleted successfully')
        this.isDeleting = false
        this.$emit('close')
        this.$router.push('/')
      } catch (error) {
        console.error('Error deleting account:', error)
        alert(error.message || 'Failed to delete account. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-body {
  padding: 10px 0;
}

.close-btn {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.edit-btn, .delete-btn, .confirm-btn, .cancel-btn, .save-btn {
  background-color: #2f4f4f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn, .cancel-btn {
  background-color: #d9534f;
}

.confirm-btn {
  background-color: #2f4f4f;
}

.edit-btn:hover, .delete-btn:hover, .confirm-btn:hover, .cancel-btn:hover, .save-btn:hover {
  opacity: 0.8;
}

</style>
