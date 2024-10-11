<template>
  <div>
    <GuardianBookingTable />
    <BabysitterBookingTable />
  </div>
</template>

<script>
import GuardianBookingTable from '@/components/GuardianBookingTable.vue'
import BabysitterBookingTable from '@/components/BabysitterBookingTable.vue'

export default {
  name: 'Booking',
  components: {
    GuardianBookingTable,
    BabysitterBookingTable
  }
}
</script>

<style scoped>
</style>
