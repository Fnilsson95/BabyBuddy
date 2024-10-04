<template>
  <div class="job-details">
    <div class="grid-container">
      <p class="sectionTitle">Date</p>
      <div class="grid-item">
        <div class="dates">
          <p class="label">Start Date:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ booking.startDateTime }}
            </p>
          </div>
        </div>
        <div class="dates">
          <p class="label">End Date/Time:</p>
          <div class="textContainer">
            <p class="modalText">{{ booking.endDateTime }}</p>
          </div>
        </div>
      </div>
      <p class="sectionTitle">Location</p>
      <div class="grid-item">
        <div>
          <p class="label">Pickup Location:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ booking.location.pickup_Location }}
            </p>
          </div>
        </div>
        <div>
          <p class="label">Dropoff Location:</p>
          <div class="textContainer">
            <p class="modalText">
              {{ booking.location.dropoff_Location }}
            </p>
          </div>
        </div>
      </div>
      <p class="sectionTitle">Guardian</p>
      <div class="guardianContainer">
        <p style="font-size: 18px; font-weight: 600; margin: 0">
          {{ booking.guardian.name.firstName }}
          {{ booking.guardian.name.lastName }}
        </p>

        <p style="font-size: 14px; margin: 0">
          Email:
          {{ booking.guardian.email }}
        </p>

        <p style="font-size: 14px; margin: 0">
          Phone:
          {{ booking.guardian.phoneNumber }}
        </p>
        <p style="font-size: 14px; margin: 0">
          Children:
          {{ booking.children.length }}
        </p>
      </div>
      <div class="bookingStatus">
        <p>
          Status:
          <span style="font-weight: 600">{{ booking.status }}</span>
        </p>

        <p>
          Total cost:
          <span style="font-weight: 600">${{ booking.totalCost }}</span>
        </p>
      </div>
    </div>
    <div class="apply-button-container">
      <button class="apply-button" @click="handleConfirmBooking(booking.id)">
        Apply
      </button>
    </div>
  </div>
</template>

<script>
import { bookingApi } from '@/api/bookings'

export default {
  name: 'JobModalContent',
  components: {},
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleConfirmBooking(bookingId, babysitterId) {
      try {
        bookingApi.confirmBooking(bookingId, '66ff1821d6c0fea82a7301ae')
        this.$emit('apply-and-close')
      } catch (error) {
        console.error('Error confirming booking:', error)
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 14;
  margin: 0;
  text-align: center;
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
}
.job-details {
  padding: 10px;
  margin: 0;
}

.grid-item {
  border: 0.3px solid #c3c3c3;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}

.guardianContainer {
  border: 0.3px solid #c3c3c3;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.sectionTitle {
  font-weight: 600;
  font-size: 20px;
  margin: 0;
}

.bookingStatus {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apply-button-container {
  margin-top: 20px;
  text-align: center;
}

.apply-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.apply-button:hover {
  background-color: #0056b3;
}
</style>
