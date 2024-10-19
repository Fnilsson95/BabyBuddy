<template>
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
          <p class="label">Hourly Rate: (SEK)</p>
          <div class="textContainer">
            <p class="modalText">{{ profile.hourlyRate }} kr/h</p>
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

    <!-- Edit and Delete Buttons -->
    <div class="button-group">
      <button @click="$emit('startEditing')" class="edit-btn">Edit Profile</button>
      <button @click="$emit('confirmDelete')" class="delete-btn">Delete Account</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayProfile',
  props: ['profile', 'role', 'formatDate']
}
</script>

<style scoped>
.profile-details {
  padding: 10px;
  margin: 0;
}

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

.info-group {
  flex: 1 1 calc(33.333% - 10px);
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
.delete-btn {
  background-color: #2f4f4f;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn {
  background-color: #d9534f;
}

.edit-btn:hover,
.delete-btn:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .info-group {
    flex: 1 1 100%;
    margin-right: 0;
  }

  .button-group button {
    flex: 1 1 100%;
    margin-right: 0;
  }
}
</style>
