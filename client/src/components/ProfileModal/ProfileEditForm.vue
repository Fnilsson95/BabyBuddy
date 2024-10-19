<template>
  <form @submit.prevent="submitForm">
    <!-- Personal Information Section -->
    <p class="sectionTitle">Personal Information</p>
    <div class="grid-item">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          v-model="localProfile.firstName"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          v-model="localProfile.lastName"
          required
        />
      </div>
      <div class="form-group">
        <label for="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          v-model="localProfile.dateOfBirth"
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
          v-model="localProfile.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="localProfile.phoneNumber"
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
            v-model="localProfile.experience"
            required
            min="0"
          />
        </div>
        <div class="form-group">
          <label for="hourlyRate">Hourly Rate: (SEK)</label>
          <input
            type="number"
            id="hourlyRate"
            v-model="localProfile.hourlyRate"
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
            v-model="localProfile.location.city"
            required
          />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <input
            type="text"
            id="country"
            v-model="localProfile.location.country"
            required
          />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input
            type="text"
            id="address"
            v-model="localProfile.location.address"
            required
          />
        </div>
      </div>
    </div>

    <!-- Save and Cancel Buttons -->
    <div class="button-group">
      <button type="submit" class="save-btn">Save Changes</button>
      <button type="button" @click="$emit('cancelEditing')" class="cancel-btn">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ProfileEditForm',
  props: ['profile', 'role'],
  data() {
    return {
      localProfile: this.copyProfile(this.profile) // Create a local copy
    }
  },
  methods: {
    copyProfile(profile) {
      // Copy to avoid mutating the original prop
      return JSON.parse(JSON.stringify(profile))
    },
    submitForm() {
      // Emit the updated profile to the parent component
      this.$emit('submitForm', this.localProfile)
    }
  },
  watch: {
    // Watch for changes in the prop and update localProfile accordingly
    profile(newProfile) {
      this.localProfile = this.copyProfile(newProfile)
    }
  }
}
</script>

<style scoped>
.sectionTitle {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}

.grid-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.form-group {
  flex: 1 1 calc(33.333% - 10px);
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.form-group label {
  width: 120px;
  font-size: 14px;
  margin-bottom: 0;
}

.form-group input {
  flex: 1;
  padding: 6px 8px;
  font-size: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 10px;
}

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

.save-btn,
.cancel-btn {
  background-color: #2f4f4f;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.cancel-btn {
  background-color: #d9534f;
}

.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .form-group {
    flex: 1 1 100%;
    margin-right: 0;
  }

  .button-group button {
    flex: 1 1 100%;
    margin-right: 0;
  }
}
input {
  border: 1px solid #ccc;
}
label {
  font-weight: bold;
}
</style>
