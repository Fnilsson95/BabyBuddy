<template>
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-content">
      <!-- Modal Header -->
      <modal-header @close="$emit('close')"></modal-header>

      <!-- Display Profile Information -->
      <div class="modal-body" v-if="!isEditing && !isDeleting">
        <display-profile
          :profile="profile"
          :role="role"
          :formatDate="formatDate"
          @startEditing="startEditing"
          @confirmDelete="confirmDelete"
        ></display-profile>
      </div>

      <!-- Profile Edit Form -->
      <div class="modal-body" v-if="isEditing">
        <profile-edit-form
          :profile="profile"
          :role="role"
          @submitForm="submitForm"
          @cancelEditing="cancelEditing"
        ></profile-edit-form>
      </div>

      <!-- Delete Confirmation -->
      <div class="modal-body" v-if="isDeleting">
        <delete-confirmation
          @deleteAccount="deleteAccount"
          @cancelDelete="cancelDelete"
        ></delete-confirmation>
      </div>
    </div>
  </div>
</template>

<script>
import { babysitterAPI } from '../api/v1/babysitter.js'
import { guardianApi } from '../api/v1/guardians.js'
import { formatDate } from '../helpers.js'
import { inject } from 'vue'

import ModalHeader from './ProfileModal/ModalHeader.vue'
import DisplayProfile from './ProfileModal/DisplayProfile.vue'
import ProfileEditForm from './ProfileModal/ProfileEditForm.vue'
import DeleteConfirmation from './ProfileModal/DeleteConfirmation.vue'
export default {
  name: 'ProfileModal',
  components: {

    ModalHeader,
    DisplayProfile,
    ProfileEditForm,
    DeleteConfirmation
  },
  data() {
    return {
      isEditing: false,
      isDeleting: false,
      profile: {},
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
    }
  },
  methods: {
    extractIdAndRoleFromURL() {
      this.id = this.$route.params.id

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
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
        this.error = 'Failed to load profile data.'
      }
    },

    formatDate,

    startEditing() {
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
    },
    async submitForm(updatedProfile) {
      try {
        if (this.role === 'babysitter') {
          await babysitterAPI.updateBabysitter(this.id, updatedProfile)
        } else if (this.role === 'guardian') {
          await guardianApi.updateGuardian(this.id, updatedProfile)
        } else {
          throw new Error('Invalid role.')
        }
        // Update the local profile with the updated data
        this.profile = updatedProfile
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

#modalOverlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-body {
  padding: 10px 0;
}

@media (max-width: 600px) {
  .modal-content {
    width: 90%;
  }
}
</style>
