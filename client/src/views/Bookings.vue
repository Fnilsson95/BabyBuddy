<template>
  <div>
    <GuardianBookingTable v-if="role === 'guardian'" :guardianId="id" />
    <BabysitterBookingTable v-if="role === 'babysitter'" :babysitterId="id" />
  </div>
</template>

<script>
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
</style>
