<template>
    <div class="pt-3">
        <BForm @submit="onSubmit">
            <BFormFloatingLabel class="my-2" v-for="date in dates" :key="date.name" :label="date.label"
                :label-for="date.name">
                <BFormInput v-model="booking[date.name]" :id="date.name" :type="date.type" />
            </BFormFloatingLabel>
            <Button type="submit" variant="primary">Send request</Button>
        </BForm>
    </div>
</template>

  
<script setup>
import { reactive } from 'vue'
import Button from '@/components/Button.vue'
import { bookingApi } from '@/api/bookings'

const dates = [
    { label: 'Start date and time', type: 'datetime-local', name: 'startDate' },
    { label: 'End date and time', type: 'datetime-local', name: 'endDate' },
    { label: 'Pick-up location', type: 'text', name: 'pickUpLocation' },
    { label: 'Drop-off location', type: 'text', name: 'dropOffLocation' }
]

const booking = reactive({
    startDate: null,
    endDate: null,
    pickUpLocation: '',
    dropOffLocation: ''
})

const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(booking));
}
</script>