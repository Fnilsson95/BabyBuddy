<template>
  <BContainer class="py-5">
    <BTable
      :items="bookings"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      responsive="sm"
      hover
      striped
      bordered
      small
    >
      <template #cell(startDateTime)="row">
        {{ row.item.startDateTime }}
      </template>
      <template #cell(endDateTime)="row">
        {{ row.item.endDateTime }}
      </template>
      <template #cell(totalCost)="row">
        ${{ row.item.totalCost }}
      </template>
      <template #cell(pickupLocation)="row">
        {{ row.item.location.pickup_Location }}
      </template>
      <template #cell(dropoffLocation)="row">
        {{ row.item.location.dropoff_Location }}
      </template>
      <template #cell(guardian)="row">
        {{ row.item.guardian.firstName }}
      </template>
      <template #cell(babysitter)="row">
        {{ row.item.babysitter ? row.item.babysitter.firstName : 'Unassigned' }}
      </template>
      <template #cell(children)="row">
        {{ row.item.children.length }}
      </template>
      <template #cell(status)="row">
        {{ row.item.status }}
      </template>
      <template #cell(description)="row">
        {{ row.item.description }}
      </template>
      <template #cell(additionalInformation)="row">
        <BButton size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide Details' : 'Show Details' }}
        </BButton>
      </template>

      <!-- Row Details (Additional Information) -->
      <template #row-details="row">
        <BCard class="p-2">
          <p> {{ row.item.additionalInformation }}</p>
        </BCard>
      </template>
    </BTable>

    <!-- Pagination and Rows per page control -->
    <BRow class="mt-3 align-items-center">
      <BCol md="6" class="d-flex">
        <BFormGroup class="mb-0 d-flex align-items-center">
          <label class="me-2">Rows per page:</label>
          <BFormSelect v-model="perPage" :options="perPageOptions" @change="fetchBookings" />
        </BFormGroup>
      </BCol>
      <BCol md="6" class="d-flex justify-content-end">
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="end"
          size="sm"
          @input="fetchBookings"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import { ref, onMounted } from 'vue'
import { bookingApi } from '@/api/v1/bookings'

export default {
  name: 'BookingsTable',
  setup() {
    const bookings = ref([])
    const totalRows = ref(0)
    const currentPage = ref(1)
    const perPage = ref(5)

    const fields = [
      { key: 'startDateTime', label: 'Start Date', sortable: true },
      { key: 'endDateTime', label: 'End Date' },
      { key: 'totalCost', label: 'Total Cost' },
      { key: 'pickupLocation', label: 'Pickup Location' },
      { key: 'dropoffLocation', label: 'Dropoff Location' },
      { key: 'guardian', label: 'Guardian' },
      { key: 'babysitter', label: 'Babysitter' },
      { key: 'children', label: 'Children' },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'description', label: 'Description' },
      { key: 'additionalInformation', label: 'Additional Information' }
    ]

    const perPageOptions = [
      { value: 5, text: '5' },
      { value: 10, text: '10' },
      { value: 15, text: '15' },
      { value: 20, text: '20' }
    ]

    const fetchBookings = async () => {
      try {
        const data = await bookingApi.getAllBookings(currentPage.value, perPage.value)
        bookings.value = data.bookings
        totalRows.value = data.total
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    onMounted(fetchBookings)

    return {
      bookings,
      totalRows,
      currentPage,
      perPage,
      fields,
      perPageOptions,
      fetchBookings
    }
  }
}
</script>

<style scoped>
.table {
  background-color: white;
  border-radius: 10px;
}

.mt-3 {
  margin-top: 1.5rem;
}
</style>
