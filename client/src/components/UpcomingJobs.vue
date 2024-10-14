<template>
  <BRow>
    <BCol
      xs="12"
      md="6"
      class="mb-3"
      v-for="booking in bookings.bookings"
      :key="booking._id"
    >
      <BookingCard :booking="booking" key="booking._id">
        <template #button>
          <div class="btn-row">
            <button
              class="apply-button-container apply-button apply-button:hover"
              @click="modal = !modal"
            >
              View Details
            </button>
            <BModal v-model="modal" title="Booking Information" hide-footer>
              <JobModalContent
                :booking="booking"
                @booking-updated="$emit('booking-updated')"
                @update:modalRef="modal = $event"
            /></BModal>
            <button
              class="apply-button apply-button:hover cancel-button"
              @click="cancelBooking(booking._id)"
            >
              Cancel
            </button>
          </div>
        </template>
      </BookingCard>
    </BCol>
  </BRow>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { bookingApi } from '@/api/v1/bookings'
import { calculateDuration, formatDate } from '@/helpers'
import BookingCard from './BookingCard.vue'

const bookings = ref([])
const modal = ref(false)

const emit = defineEmits(['booking-updated'])
const route = useRoute()

const getBookings = async () => {
  const { id } = route.params
  try {
    bookings.value = await bookingApi.getBabysitterBookings(id)
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

const cancelBooking = async (bookingId) => {
  const { id } = route.params
  try {
    await bookingApi.deleteBooking(bookingId, id)
    emit('booking-updated')
    await getBookings()
  } catch (error) {
    console.error('Error canceling booking:', error)
  }
}

onMounted(async () => {
  await getBookings()
})

defineExpose({
  calculateDuration,
  formatDate,
  cancelBooking
})
</script>

<style scoped>
.cardRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.btn-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apply-button {
  min-width: 110px;
  background-color: #2f4f4f;
  color: #f5f5f5;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.apply-button:hover {
  background-color: rgba(47, 79, 79, 0.5);
  transform: scale(1.05);
}

.cancel-button {
  background-color: #d9534f;
}
</style>
