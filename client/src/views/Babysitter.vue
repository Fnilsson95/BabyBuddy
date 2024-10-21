<template>
  <div>
    <Navbar></Navbar>
    <div class="babysitter-container">
      <BContainer fluid>
        <BRow>
          <BCol xs="12">
            <Earnings :key="refreshKey" :refresh-key="refreshKey" />
          </BCol>
        </BRow>
        <BRow class="gx-5">
          <BCol sm="12" md="6">
            <div class="pt-5">
              <h2 style="margin-bottom: 20px; color: #2f4f4f">
                Jobs Available
              </h2>
              <JobsPending :key="refreshKey" @booking-updated="refreshData" />
            </div>
          </BCol>
          <BCol sm="12" md="6">
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

<style>
.babysitter-container {
  background-color: #e0f7e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 40px;
}
</style>
