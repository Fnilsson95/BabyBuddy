<template>
  <BContainer class="py-5">
    <BRow class="mb-3">
      <BCol lg="12" class="d-flex justify-content-end">
        <BFormGroup v-slot="{ ariaDescribedby }" label="Sort" label-for="sort-by-select" label-align="right"
          label-size="sm" class="mb-0 d-flex align-items-center">
          <label class="me-2">Sort by:</label>
          <BFormSelect v-model="sortByKey" :options="sortOptions" :aria-describedby="ariaDescribedby" size="sm"
            class="me-2" />
          <BFormSelect v-model="sortOrder" :disabled="!sortByKey" size="sm" class="me-2">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </BFormSelect>
        </BFormGroup>
      </BCol>
    </BRow>

    <BTable :items="sortedItems" :fields="fields" responsive="sm" hover striped bordered small>
      <template #cell(startDateTime)="row">
        {{ formatDate(row.item.startDateTime) }}
      </template>
      <template #cell(endDateTime)="row">
        {{ formatDate(row.item.endDateTime) }}
      </template>
      <template #cell(totalCost)="row">
        ${{ row.item.totalCost }}
      </template>
      <template #cell(pickupLocation)="row">
        {{ row.item.location.pickupLocation }}
      </template>
      <template #cell(dropoffLocation)="row">
        {{ row.item.location.dropoffLocation }}
      </template>
      <template #cell(guardian)="row">
        {{ row.item.guardian.firstName }}
      </template>
      <template #cell(children)="row">
        {{ row.item.children.map(children => children.firstName).join(', ') }}
      </template>
      <template #cell(status)="row">
        {{ row.item.status }}
      </template>
      <template #cell(description)="row">
        {{ row.item.description }}
      </template>
      <template #cell(additionalInformation)="row">
        <BButton size="sm" class="custom-button" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide Details' : 'Show Details' }}
        </BButton>
      </template>
      <template #row-details="row">
        <BCard class="p-2">
          <p> {{ row.item.additionalInformation }} </p>
        </BCard>
      </template>
    </BTable>

    <!-- Pagination control -->
    <BRow class="mt-3 align-items-center">
      <BCol md="6" class="d-flex">
        <BFormGroup label="Rows per page" label-size="sm" class="mb-0 d-flex align-items-center">
          <label class="me-2">Rows per page:</label>
          <BFormSelect v-model="perPage" :options="perPageOptions" size="sm" />
        </BFormGroup>
      </BCol>
      <BCol md="6" class="d-flex justify-content-end">
        <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="end" size="sm" />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { bookingApi } from '../api/v1/bookings'
import { useRoute } from 'vue-router'
import { formatDate } from '../helpers'

// State variables
const items = ref([]) // Initially empty; data will be fetched from the API
const totalRows = ref(0)
const currentPage = ref(1)
const perPage = ref(5)
const sortByKey = ref('startDateTime')
const sortOrder = ref('asc')

// Extract the guardian ID from the URL
const route = useRoute()
const guardianId = route.params.id

// Fetch the guardian's bookings when the component is mounted
const fetchBookings = async () => {
  try {
    const { bookings, totalBookings } = await bookingApi.getAllBabysitterBookings(
      guardianId,
      currentPage.value,
      perPage.value,
      sortByKey.value,
      sortOrder.value
    )
    items.value = bookings
    totalRows.value = totalBookings
  } catch (error) {
    console.error('Error fetching guardian bookings:', error)
  }
}

// Call the fetchBookings function when the component is mounted
onMounted(fetchBookings)

// Reactive values (currentPage, perPage, sortByKey, sortOrder) and trigger fetchBookings
// For dynamic updating
watch([currentPage, perPage, sortByKey, sortOrder], fetchBookings)

// Fields for the table (same as before)
const fields = ref([
  { key: 'startDateTime', label: 'Start Date', sortable: true },
  { key: 'endDateTime', label: 'End Date' },
  { key: 'totalCost', label: 'Total Cost' },
  { key: 'pickupLocation', label: 'Pickup Location' },
  { key: 'dropoffLocation', label: 'Dropoff Location' },
  { key: 'guardian', label: 'Guardian' },
  { key: 'children', label: 'Children' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'additionalInformation', label: 'Additional Information' }
])

// Sorting options
const sortOptions = [
  { value: 'startDateTime', text: 'Start Date' },
  { value: 'status', text: 'Status' }
]

// Sorting logic (this is applied on the backend, not the frontend)
const sortedItems = computed(() => {
  return items.value
})

// Options for rows per page
const perPageOptions = [
  { value: 5, text: '5' },
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' }
]
</script>

<style scoped>
.table {
  background-color: white;
  border-radius: 10px;
}

.mt-3 {
  margin-top: 1.5rem;
}

.custom-button {
  margin-top: 0.5rem;
  background-color: #3c5c5e;
  color: white;
  border-radius: 15px;
  border: none;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #2d4749;
}

.text-center {
  text-align: center;
}
</style>
