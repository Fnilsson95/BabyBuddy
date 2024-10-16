<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Profile Information</h2>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>
      <div class="modal-body" v-if="!isEditing && !isDeleting">
        <!-- Display Profile Information -->
        <p><strong>First Name:</strong> {{ profile.firstName }}</p>
        <p><strong>Last Name:</strong> {{ profile.lastName }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Phone Number:</strong> {{ profile.phoneNumber }}</p>

        <!-- Edit and Delete Buttons -->
        <div class="button-group">
          <button @click="startEditing" class="edit-btn">Edit Profile</button>
          <button @click="confirmDelete" class="delete-btn">Delete Account</button>
        </div>
      </div>

      <!-- Profile Edit Form -->
      <div class="modal-body" v-if="isEditing">
        <form @submit.prevent="submitForm">
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
            <label for="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="profile.phoneNumber"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="profile.password"
              minlength="6"
              maxlength="20"
              required
            />
          </div>
          <!-- Save and Cancel Buttons -->
          <div class="button-group">
            <button type="submit" class="save-btn">Save Changes</button>
            <button type="button" @click="cancelEditing" class="cancel-btn">Cancel</button>
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
export default {
  name: 'ProfileModal',
  data() {
    return {
      isEditing: false, // Track if we're editing profile
      isDeleting: false, // Track if we're confirming deletion
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+123456789',
        password: 'password123'
      }
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
    },
    submitForm() {
      // Handle form submission logic here
      console.log('Profile data submitted:', this.profile)
      this.isEditing = false
    },
    confirmDelete() {
      this.isDeleting = true
    },
    cancelDelete() {
      this.isDeleting = false
    },
    deleteAccount() {
      // Handle account deletion logic here
      console.log('Account deleted')
      this.isDeleting = false
      this.$emit('close')
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
