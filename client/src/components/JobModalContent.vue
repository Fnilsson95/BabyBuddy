<template>
  <div class="job-details">
    <div class="grid-container">
      <p class="sectionTitle">Date</p>
      <div class="grid-item">
        <div class="dates">
          <p class="label">Start Date:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ formatDate(booking.startDateTime) }}
            </p>
          </div>
        </div>
        <div class="dates">
          <p class="label">End Date/Time:</p>
          <div class="textContainer">
            <p class="modalText">{{ formatDate(booking.endDateTime) }}</p>
          </div>
        </div>
      </div>
      <p class="sectionTitle">Location</p>
      <div class="grid-item">
        <div>
          <p class="label">Pickup Location:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ booking.location.pickupLocation }}
            </p>
          </div>
        </div>
        <div>
          <p class="label">Dropoff Location:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ booking.location.dropoffLocation }}
            </p>
          </div>
        </div>
      </div>
      <p class="sectionTitle">
        Guardian -
        {{ booking.guardian.firstName + ' ' + booking.guardian.lastName }}
      </p>
      <div class="grid-item">
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <p class="label">Email:</p>
          <p class="modalText">
            {{ booking.guardian.email }}
          </p>
        </div>

        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <p class="label">Phone:</p>
          <p class="modalText">
            {{ booking.guardian.phoneNumber }}
          </p>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <p class="label">Children:</p>
          <p class="modalText">
            {{ booking.children.length }}
          </p>
        </div>
      </div>
    </div>
    <div class="bookingStatus">
      <p>
        Status:
        <span>{{ booking.status }}</span>
      </p>

      <p>
        Total cost:
        <span>{{ booking.totalCost }}kr</span>
      </p>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script setup>
import { formatDate } from '@/helpers'

defineProps({
  booking: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.label {
  font-size: 14px;
  margin: 0;
  text-align: center;
  text-decoration: underline;
}

.textContainer {
  font-size: 16;
  font-weight: 600;

  padding: 6px 8px;
  background-color: white;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modalText {
  margin: 0;
  text-align: center;
  color: #2f4f4f;
  font-size: 14px;
  font-weight: 600;
}

.job-details {
  padding: 10px;
  margin: 0;
}

.grid-item {
  border: 1px solid #2f4f4f;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}

.guardianContainer {
  border: 1px solid #2f4f4f;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sectionTitle {
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 5px 0;
  color: #2f4f4f;
}

.bookingStatus {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  font-weight: 600;
  color: #2f4f4f;
}
</style>
