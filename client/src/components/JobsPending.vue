<template>
  <BRow class="gx-2">
    <BCol
      sm="4"
      md="6"
      lg="6"
      xl="4"
      class="mb-3"
      v-for="booking in structuredBookings"
      :key="booking._id"
      style="display: flex; align-items: center; justify-content: center"
    >
      <BookingCard :booking="booking" :key="booking._id">
        <template #button>
          <div class="button-container">
            <button class="button button:hover" @click="openModal(booking)">
              Details
            </button>
          </div>
        </template>
      </BookingCard>
    </BCol>
    <BModal
      v-model="modal"
      title="Booking Information"
      hide-footer
      v-if="selectedBooking"
    >
      <JobModalContent
        :booking="selectedBooking"
        :key="selectedBooking?.id"
        @booking-updated="$emit('booking-updated')"
      >
        <template #button>
          <div class="button-container">
            <button
              class="button button:hover"
              @click="handleConfirmBooking(selectedBooking.id)"
            >
              Apply
            </button>
          </div>
        </template>
      </JobModalContent>
    </BModal>
  </BRow>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { bookingApi } from '@/api/v1/bookings'
import { calculateDuration, formatDate } from '@/helpers'
import BookingCard from './BookingCard.vue'
import { useRoute } from 'vue-router'

// Initial References
const structuredBookings = ref([])
const modal = ref(false)
const selectedBooking = ref(null)

// Emits
const emit = defineEmits(['booking-updated'])

const route = useRoute()

// Function that refreshes bookings
const refreshBookings = async () => {
  try {
    const bookings = await bookingApi.getAllPendingBookings()
    if (bookings.length === 0) {
      return
    }

    structuredBookings.value = bookings.bookings.map((booking) => {
      return {
        id: booking._id,
        description: booking.description,
        createdAt: booking.createdAt,
        startDateTime: formatDate(booking.startDateTime),
        endDateTime: formatDate(booking.endDateTime),
        duration: calculateDuration(booking.startDateTime, booking.endDateTime),
        location: booking.location,
        guardian: {
          firstName: booking.guardian.firstName,
          lastName: booking.guardian.lastName,
          email: booking.guardian.email,
          phoneNumber: booking.guardian.phoneNumber
        },
        children: booking.children,
        status: booking.status,
        totalCost: booking.totalCost
      }
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

const openModal = (booking) => {
  selectedBooking.value = booking
  modal.value = true
}

// Function that confirms a booking
const handleConfirmBooking = async (bookingId) => {
  const { id } = route.params
  try {
    await bookingApi.confirmBooking(bookingId, id)
    modal.value = false
    emit('booking-updated')
  } catch (error) {
    console.error('Error confirming booking:', error)
  }
}

onMounted(refreshBookings)
</script>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  min-width: 80px;
  background-color: #2f4f4f;
  color: #f5f5f5;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.button:hover {
  background-color: rgba(47, 79, 79, 0.5);
  transform: scale(1.05);
}
</style>
