<template>
    <div class="card-wrapper" v-if="store.guardian.bookings.length > 0" v-for="booking in store.guardian.bookings"
        :key="booking._id">
        <BookingCard :booking="booking" card-type="guardian">
            <template #header>
                Booking for {{ booking.children?.map(child => child.firstName).join(', ') }}
            </template>
            <template #button>
                <Modal title="Delete booking?" buttonType="outline-danger">
                    <template #content>
                        <h5 class="mb-4">Are you sure you want to delete this booking?</h5>
                        <Button variant="danger" @click="() => handleDelete(booking._id)">Delete</Button>
                    </template>
                    <template #button>Delete booking</template>
                </Modal>
            </template>
        </BookingCard>
    </div>
    <em class="header-box mt-4" v-else>No upcoming bookings</em>
</template>

<script setup>
import { computed, inject } from 'vue';
import { formatDate } from '@/helpers';
import { useRoute } from 'vue-router';
import { store } from '@/stores/guardianStore';
import BookingCard from '@/components/BookingCard.vue'

const showToast = inject('showToast')

const handleDelete = async (bookingId) => {
    try {
        await store.deleteBooking(bookingId);
        showToast('Success', 'Successfully deleted booking', 'success')
    } catch (error) {
        showToast('Error', 'Could not delete booking', 'danger')
        console.error('Error deleting booking:', error)
    }
}
</script>

<style scoped>
.header-box {
    border: 1px solid #3c5c5e;
    background-color: #e0f7e9;
    padding: 0.5rem;
    border-radius: 5px;
    width: 60%;
    max-width: 600px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
}

.card-wrapper {
    margin-top: 24px;
}
</style>