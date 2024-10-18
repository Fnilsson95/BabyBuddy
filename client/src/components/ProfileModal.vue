<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="profile-header">Profile Information</h2>
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
        <div class="profile-details">
          <!-- Personal Information Section -->
          <p class="sectionTitle">Personal Information</p>
          <div class="grid-item">
            <div class="info-group">
              <p class="label">First Name:</p>
              <div class="textContainer">
                <p class="modalText">{{ profile.firstName }}</p>
              </div>
            </div>
            <div class="info-group">
              <p class="label">Last Name:</p>
              <div class="textContainer">
                <p class="modalText">{{ profile.lastName }}</p>
              </div>
            </div>
            <div class="info-group">
              <p class="label">Date of Birth:</p>
              <div class="textContainer">
                <p class="modalText">{{ formatDate(profile.dateOfBirth) }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <p class="sectionTitle">Contact Information</p>
          <div class="grid-item">
            <div class="info-group">
              <p class="label">Email:</p>
              <div class="textContainer">
                <p class="modalText">{{ profile.email }}</p>
              </div>
            </div>
            <div class="info-group">
              <p class="label">Phone Number:</p>
              <div class="textContainer">
                <p class="modalText">{{ profile.phoneNumber }}</p>
              </div>
            </div>
          </div>

          <!-- Additional Fields Based on Role -->
          <div v-if="role === 'babysitter'">
            <p class="sectionTitle">Professional Details</p>
            <div class="grid-item">
              <div class="info-group">
                <p class="label">Experience: (Years)</p>
                <div class="textContainer">
                  <p class="modalText">{{ profile.experience }}</p>
                </div>
              </div>
              <div class="info-group">
                <p class="label">Hourly Rate: (SEK) </p>
                <div class="textContainer">
                  <p class="modalText">{{ profile.hourlyRate }} kr/h </p>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="role === 'guardian'">
            <p class="sectionTitle">Location</p>
            <div class="grid-item">
              <div class="info-group">
                <p class="label">City:</p>
                <div class="textContainer">
                  <p class="modalText">{{ profile.location?.city }}</p>
                </div>
              </div>
              <div class="info-group">
                <p class="label">Country:</p>
                <div class="textContainer">
                  <p class="modalText">{{ profile.location?.country }}</p>
                </div>
              </div>
              <div class="info-group">
                <p class="label">Address:</p>
                <div class="textContainer">
                  <p class="modalText">{{ profile.location?.address }}</p>
                </div>
              </div>
            </div>
          </div>
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
          <!-- Personal Information Section -->
          <p class="sectionTitle">Personal Information</p>
          <div class="grid-item">
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
              <label for="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                v-model="profile.dateOfBirth"
                required
              />
            </div>
          </div>

          <!-- Contact Information Section -->
          <p class="sectionTitle">Contact Information</p>
          <div class="grid-item">
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
              <label for="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                v-model="profile.phoneNumber"
                required
              />
            </div>
          </div>

          <!-- Additional Fields Based on Role -->
          <div v-if="role === 'babysitter'">
            <p class="sectionTitle">Professional Details</p>
            <div class="grid-item">
              <div class="form-group">
                <label for="experience">Experience (Years)</label>
                <input
                  type="number"
                  id="experience"
                  v-model="profile.experience"
                  required
                  min="0"
                />
              </div>
              <div class="form-group">
                <label for="hourlyRate">Hourly Rate: (SEK)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  v-model="profile.hourlyRate"
                  required
                  min="50"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div v-else-if="role === 'guardian'">
            <p class="sectionTitle">Location</p>
            <div class="grid-item">
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
import { babysitterAPI } from '../api/v1/babysitter.js'
import { guardianApi } from '../api/v1/guardians.js'
import { inject } from 'vue'

export default {
  name: 'ProfileModal',
  data() {
    return {
      isEditing: false,
      isDeleting: false,
      profile: {},
      isLoading: true,
      error: null,
      id: null,
      role: null
    }
  },
  setup() {
    const showToast = inject('showToast')
    return {
      showToast
    }
  },
  created() {
    this.extractIdAndRoleFromURL()
    if (!this.error) {
      this.fetchProfileData()
    } else {
      this.isLoading = false
    }
  },
  methods: {
    extractIdAndRoleFromURL() {
      this.id = this.$route.params.id

      if (this.$route.path.includes('guardian')) {
        this.role = 'guardian'
      } else if (this.$route.path.includes('babysitter')) {
        this.role = 'babysitter'
      } else {
        this.error = 'Invalid role in URL.'
        console.error('Invalid role in URL.')
      }
    },
    async fetchProfileData() {
      try {
        if (this.role === 'babysitter') {
          this.profile = await babysitterAPI.getBabysitter(this.id)
        } else if (this.role === 'guardian') {
          this.profile = await guardianApi.getGuardian(this.id)
          // Ensure location object exists for guardians
          if (!this.profile.location) {
            this.$set(this.profile, 'location', {
              city: '',
              country: '',
              address: ''
            })
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
        this.error = 'Failed to load profile data.'
      } finally {
        this.isLoading = false
      }
    },
    formatDate(date) {
      if (!date) return ''
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
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
        this.showToast('Success', 'Profile updated successfully!', 'success')
      } catch (error) {
        console.error('Error updating profile:', error)
        this.showToast('Error', error.message, 'danger')
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
        this.showToast('Success', 'Account deleted successfully!', 'success')
        this.isDeleting = false
        setTimeout(() => {
          this.$emit('close')
          this.$router.push('/')
        }, 3000)
      } catch (error) {
        console.error('Error deleting account:', error)
        this.showToast('Error', error.message, 'danger')
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
  width: 600px; /* Increased width for better alignment */
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 10px 0;
}

.profile-details {
  padding: 10px;
  margin: 0;
}

.sectionTitle {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}

/* Grid Items for Display and Form */
.grid-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.info-group,
.form-group {
  flex: 1 1 calc(33.333% - 10px); /* Three items per row */
  margin-bottom: 10px;
  margin-right: 10px;
}

.label {
  font-size: 14px;
  margin: 0;
}

.textContainer {
  font-size: 16px;
  font-weight: 600;
  padding: 6px 8px;
  background-color: #f5f5f5;
  margin: 0;
  display: flex;
  align-items: center;
}

.modalText {
  margin: 0;
}

/* Form Styles */
.form-group {
  display: flex;
  align-items: center;
}

.form-group label {
  width: 120px; /* Fixed label width */
  font-size: 14px;
  margin-bottom: 0;
}

.form-group input {
  flex: 1;
  padding: 6px 8px;
  font-size: 16px;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 10px;
}

/* Button Styles */
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  flex: 1 1 calc(48% - 10px);
  margin-right: 10px;
  margin-bottom: 10px;
}

.button-group button:last-child {
  margin-right: 0;
}

.edit-btn,
.delete-btn,
.confirm-btn,
.cancel-btn,
.save-btn {
  background-color: #2f4f4f;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn,
.cancel-btn {
  background-color: #d9534f;
}

.edit-btn:hover,
.delete-btn:hover,
.confirm-btn:hover,
.cancel-btn:hover,
.save-btn:hover {
  opacity: 0.8;
}

/* Responsive Adjustment */
@media (max-width: 600px) {
  .info-group,
  .form-group {
    flex: 1 1 100%;
    margin-right: 0;
  }

  .button-group button {
    flex: 1 1 100%;
    margin-right: 0;
  }

  .modal-content {
    width: 90%;
  }
}
</style>
