<template>
  <BRow>
    <BCol
      xs="12"
      md="6"
      class="mb-3"
      v-for="booking in structuredBookings"
      :key="booking._id"
    >
      <BookingCard :booking="booking" :key="booking._id">
        <template #button>
          <div class="button-container">
            <button class="button button:hover" @click="modal = !modal">
              View Details
            </button>
          </div>
          <BModal v-model="modal" title="Booking Information" hide-footer>
            <JobModalContent
              :booking="booking"
              @booking-updated="$emit('booking-updated')"
            >
              <template #button>
                <div class="button-container">
                  <button
                    class="button button:hover"
                    @click="handleConfirmBooking(booking.id)"
                  >
                    Apply
                  </button>
                </div>
              </template>
            </JobModalContent>
          </BModal>
        </template>
      </BookingCard>
    </BCol>
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
  background-color: #2f4f4f;
  color: #f5f5f5;
  border: none;
  padding: 10px 20px;
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
