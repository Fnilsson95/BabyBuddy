<template>
  <!-- Wrap the Navbar and content inside a single root div -->
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Main content box -->
    <div class="bookings-container">
      <div class="bookings-box">
        <!-- Booking History Header inside the bookings box -->
        <div class="header-box">
          <h2>Booking History</h2>
        </div>

        <!-- Booking tables based on the role -->
        <GuardianBookingTable v-if="role === 'guardian'" :guardianId="id" />
        <BabysitterBookingTable v-if="role === 'babysitter'" :babysitterId="id" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import GuardianBookingTable from '@/components/GuardianBookingTable.vue'
import BabysitterBookingTable from '@/components/BabysitterBookingTable.vue'

export default {
  name: 'Bookings',
  data() {
    return {
      role: null, // Define the role (guardian or babysitter)
      id: null // Store the extracted id from the URL
    }
  },
  created() {
    // Extract the ID from the URL
    this.id = this.$route.params.id

    // Determine role based on the URL path
    if (this.$route.path.includes('guardian')) {
      this.role = 'guardian'
    } else if (this.$route.path.includes('babysitter')) {
      this.role = 'babysitter'
    }
  }
}
</script>

<style scoped>

.bookings-container {
  background-color: #e0f7e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 40px;
}

.bookings-box {
  background-color: #ffffff;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
}

.header-box {
  border: 1px solid #3c5c5e;
  background-color: #f0f4f8;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  width: 60%;
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.header-box h2 {
  font-size: 2rem;
  color: #3c5c5e;
}

.guardian-booking-table,
.babysitter-booking-table {
  width: 100%;
  overflow-x: auto;
  display: block;
}

/* Responsive design for smaller devices */
@media (max-width: 768px) {
  .bookings-box {
    padding: 1rem;
    width: 95%;
    overflow-x: auto;
  }
  .header-box {
    width: 90%;
  }
}
</style>
