<template>
  <div class="pt-5">
    <h2>Earnings</h2>
    <div class="container">
      <Earningcard title="Total" :value="total" />
      <Earningcard title="Month" :value="month" />
      <Earningcard title="Upcoming" :value="future" />
    </div>
  </div>
</template>

<script setup>
import { bookingApi } from '@/api/v1/bookings'
import Earningcard from './Earningcard.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { isThisMonth } from '@/helpers'

const { refreshKey } = defineProps({
  refreshKey: {
    type: Number,
    required: true
  }
})

const route = useRoute()
const { id } = route.params
const total = ref(0)
const month = ref(0)
const future = ref(0)

const getAllBookings = async () => {
  try {
    const result = await bookingApi.getAllBabysitterBookings(id)

    // Filter the results and then accumulates the total value of all bookings

    total.value = result.bookings.reduce(
      (acc, currVal) => acc + currVal.totalCost,
      future.value
    )

    month.value = result.bookings
      .filter((booking) => {
        return isThisMonth(booking.startDateTime)
      })
      .reduce((acc, currVal) => acc + currVal.totalCost, month.value)

    future.value = result.bookings
      .filter((booking) => booking.status === 'Confirmed')
      .reduce((acc, currVal) => acc + currVal.totalCost, future.value)
  } catch (error) {
    console.error(error.message)
  }
}

watch(
  () => refreshKey,
  () => {
    getAllBookings()
  }
)

onMounted(getAllBookings)
</script>

<style>
.container {
  width: 100%;
  display: flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
</style>
