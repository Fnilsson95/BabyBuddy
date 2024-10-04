<template>
  <div>
    <Navbar></Navbar>
    <BContainer>
      <Earnings />

      <BRow>
        <BCol xs="12">
          <div class="pt-5">
            <h2>Jobs Available</h2>
            <JobsPending />
          </div>
        </BCol>
        <BCol xs="6">
          <div class="pt-5">
            <h2>Upcoming Bookings</h2>
            <Upcoming />
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Upcoming from '@/components/Upcoming.vue'
import Earnings from '@/components/Earnings.vue'
import JobsPending from '@/components/JobsPending.vue'

export default {
  name: 'babysitter',
  components: {
    Navbar,
    Earnings,
    Upcoming,
    JobsPending
  },
  async mounted() {
    try {
    } catch (error) {}
  }
}
</script>

<style></style>
