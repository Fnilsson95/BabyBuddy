<template>
  <BContainer class="py-5">
    <!-- Row for sorting options -->
    <BRow class="mb-3">
      <BCol lg="12" class="d-flex justify-content-end">
        <BFormGroup
          v-slot="{ ariaDescribedby }"
          label="Sort"
          label-for="sort-by-select"
          label-align="right"
          label-size="sm"
          class="mb-0 d-flex align-items-center"
        >
          <label class="me-2">Sort by:</label>
          <BFormSelect
            v-model="sortByKey"
            :options="sortOptions"
            :aria-describedby="ariaDescribedby"
            size="sm"
            class="me-2"
          />
          <BFormSelect
            v-model="sortOrder"
            :disabled="!sortByKey"
            size="sm"
            class="me-2"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </BFormSelect>
        </BFormGroup>
      </BCol>
    </BRow>

    <!-- Main table element -->
    <BTable
      :items="sortedItems"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      responsive="sm"
      hover
      striped
      bordered
      small
    >
      <!-- Other fields remain unchanged -->
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
      <template #cell(babysitter)="row">
        {{ row.item.babysitter ? row.item.babysitter.firstName : 'Unassigned' }}
      </template>
      <!-- Display the children names instead of the full JSON object -->
      <template #cell(children)="row">
        {{ row.item.children.map(children => children.name.firstName).join(', ') }}
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
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="end"
          size="sm"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { bookingApi } from '../api/v1/bookings'
import { useRoute } from 'vue-router'

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
    const { bookings, totalBookings } = await bookingApi.getAllGuardianBookings(
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

// Watch the reactive values (currentPage, perPage, sortByKey, sortOrder) and trigger fetchBookings
watch([currentPage, perPage, sortByKey, sortOrder], fetchBookings)

// Fields for the table (same as before)
const fields = ref([
  { key: 'startDateTime', label: 'Start Date', sortable: true },
  { key: 'endDateTime', label: 'End Date' },
  { key: 'totalCost', label: 'Total Cost' },
  { key: 'pickupLocation', label: 'Pickup Location' },
  { key: 'dropoffLocation', label: 'Dropoff Location' },
  { key: 'babysitter', label: 'Babysitter' },
  { key: 'children', label: 'Children' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'additionalInformation', label: 'Additional Information' }
])

// Sorting options (same as before)
const sortOptions = [
  { value: 'startDateTime', text: 'Start Date' },
  { value: 'status', text: 'Status' }
]

// Computed: Sorting logic (this is applied on the backend, not the frontend)
const sortedItems = computed(() => {
  return items.value // No sorting needed here as the backend handles it
})

// Options for rows per page (same as before)
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
</style>
