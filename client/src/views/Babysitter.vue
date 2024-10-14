<template>
  <div>
    <Navbar></Navbar>
    <BContainer>
      <Earnings />

      <BRow class="gx-5">
        <BCol xs="12" md="12" lg="6">
          <div class="pt-5">
            <h2 style="margin-bottom: 20px; color: #2f4f4f">Jobs Available</h2>
            <JobsPending :key="refreshKey" @booking-updated="refreshData" />
          </div>
        </BCol>
        <BCol xs="12" md="12" lg="6">
          <div class="pt-5">
            <h2 style="margin-bottom: 20px; color: #2f4f4f">
              Upcoming Bookings
            </h2>
            <UpcomingJobs :key="refreshKey" @booking-updated="refreshData" />
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Earnings from '@/components/Earnings.vue'
import JobsPending from '@/components/JobsPending.vue'
import UpcomingJobs from '@/components/UpcomingJobs.vue'

const refreshKey = ref(0)

const refreshData = () => {
  refreshKey.value++
}
</script>

<style></style>
