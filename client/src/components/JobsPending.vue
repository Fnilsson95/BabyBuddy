<template>
  <BRow>
    <BCol
      xs="12"
      md="6"
      class="mb-3"
      v-for="(booking, index) in structuredBookings"
      :key="index"
    >
      <Job :booking="booking" />
    </BCol>
  </BRow>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue-next'

import { bookingApi } from '@/api/v1/bookings'
import { calculateDuration, formatDate } from '@/helpers'

export default {
  name: 'JobsPending',
  components: {
    BRow,
    BCol
  },
  data() {
    return {
      structuredBookings: []
    }
  },
  async mounted() {
    try {
      const bookings = await bookingApi.getAllPendingBookings()

      this.structuredBookings = bookings.bookings.map((booking) => {
        return {
          id: booking._id,
          description: booking.description,
          createdAt: booking.createdAt,
          startDateTime: formatDate(booking.startDateTime),
          endDateTime: formatDate(booking.endDateTime),
          duration: calculateDuration(
            booking.startDateTime,
            booking.endDateTime
          ),
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
  },
  methods: {
    formatDate,
    calculateDuration
  }
}
</script>

<style scoped></style>
