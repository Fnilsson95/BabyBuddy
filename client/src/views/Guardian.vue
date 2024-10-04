<template>
  <div>
    <Navbar></Navbar>
    <BContainer>
      <BRow>
        <BCol lg="3">
          <div class="pt-5">
            <h2>Book a babysitter</h2>
            <h3></h3>
            <Booking />
          </div>
        </BCol>
        <BCol lg="3">
          <div class="pt-5">
            <h2>Upcoming bookings</h2>
            <Upcoming />
          </div>
        </BCol>
        <BCol>
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
export default {
  name: 'guardian',
  components: {
    Button,
    Navbar,
    Booking,
    Upcoming,
    Child,
    Modal
  }
}

</script>

<style></style>


