<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard v-for="child in store.guardian.children" border-variant="primary"
                :header="`Booking for: ${child.name.firstName}`" header-bg-variant="primary" header-text-variant="white"
                align="center">
                <BCardText>{{ formatDate(sortedItems.startDateTime) }}</BCardText>
                <BCardText>Torsten is picking up {{ child.name.firstName }} at kindergarden</BCardText>
            </BCard>
        </BCardGroup>
    </div>
</template>

<script setup>
import { store } from '@/stores/guardianStore'
import { formatDate } from '@/helpers';
import { bookingApi } from '@/api/v1/bookings';
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


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

const fetchBookings = async () => {
    try {
        const { bookings } = await bookingApi.getAllGuardianBookings(
            guardianId,
            currentPage.value,
            perPage.value,
            sortByKey.value,
            sortOrder.value
        )
        items.value = bookings
    } catch (error) {
        console.error('Error fetching guardian bookings:', error)
    }
}

// Call the fetchBookings function when the component is mounted
onMounted(fetchBookings)

watch([currentPage, perPage, sortByKey, sortOrder], fetchBookings)

// Fields for the table
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

const sortedItems = computed(() => {
    return items.value
})
</script>