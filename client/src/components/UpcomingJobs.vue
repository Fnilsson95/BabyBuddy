<template>
  <div>
    <BRow class="gx-2">
      <BCol
        sm="4"
        md="6"
        lg="6"
        xl="6"
        class="mb-3 large-screen-grid"
        v-for="booking in bookings"
        :key="booking._id"
        style="display: flex; align-items: center; justify-content: center"
      >
        <BookingCard :booking="booking" key="booking._id">
          <template #button>
            <div class="btn-row">
              <button
                class="apply-button-container apply-button apply-button:hover"
                @click="openModal(booking)"
              >
                Details
              </button>

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
          @update:modalRef="modal = $event"
        />
      </BModal>
    </BRow>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { bookingApi } from '@/api/v1/bookings'
import { calculateDuration, formatDate } from '@/helpers'
import BookingCard from './BookingCard.vue'

const bookings = ref([])
const modal = ref(false)
const selectedBooking = ref(null)

const showToast = inject('showToast')
const emit = defineEmits(['booking-updated'])
const route = useRoute()

const getBookings = async () => {
  const { id } = route.params
  try {
    const res = await bookingApi.getBabysitterBookings(id)
    bookings.value = res.bookings.filter(
      (booking) => booking.status === 'Confirmed'
    )
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

    showToast('Success', 'Successfully cancelled booking', 'success')
  } catch (error) {
    showToast('Error', 'Could not cancel booking', 'danger')
    console.error('Error canceling booking:', error)
  }
}

const openModal = (booking) => {
  selectedBooking.value = booking
  modal.value = true
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
@media (min-width: 1600px) {
  .large-screen-grid {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}
.cardRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.btn-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.apply-button {
  min-width: 80px;
  background-color: #2f4f4f;
  color: #f5f5f5;
  border: none;
  padding: 6px 8px;
  font-size: 14px;
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
