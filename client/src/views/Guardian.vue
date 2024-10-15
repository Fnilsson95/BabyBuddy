<template>
  <div>
    <Navbar></Navbar>
    <BContainer>
      <BRow>
        <BCol lg="3">
          <div class="pt-5">
            <h2>Book a babysitter</h2>
            <Booking />
          </div>
        </BCol>
        <BCol lg="3">
          <div class="pt-5">
            <h2>Upcoming bookings</h2>
            <Upcoming />
          </div>
        </BCol>
        <BCol lg="6">
          <div class="pt-5">
            <h2>My children</h2>
            <Child />
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Navbar from '@/components/Navbar.vue'
import Booking from '@/components/Booking.vue'
import Upcoming from '@/components/Upcoming.vue'
import Child from '@/components/Child.vue'
import Modal from '@/components/Modal.vue'
import { guardianApi } from '../api/v1/guardians'
import { store } from '@/stores/guardianStore'
export default {
  name: 'guardian',
  components: {
    Button,
    Navbar,
    Booking,
    Upcoming,
    Child,
    Modal
  },
  setup() {
    return { store }
  },
  async mounted() {
    const guardianID = "66f155b3a06011d345d4d627"
    const guardian = await guardianApi.getGuardian(guardianID);

    console.log("guardian:", guardian);


    store.setGuardian(guardian);
    store.name = "Johannes";
  }
}

</script>

<style></style>


