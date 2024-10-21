<template>
    <div class="pt-3">
        <BForm @submit="onSubmit">
            <template v-for="input in inputs" :key="input.name">
                <BFormGroup class="fw-bold" v-if="input.type === 'checkboxGroup'" :label="input.label">
                    <BFormCheckboxGroup v-model="booking[input.name]" :name="input.name">
                        <div class="text-start fw-light" v-for="option in input.options" v-if="input.options?.length > 0"
                            :key="option.value">
                            <BFormCheckbox :value="option.value">{{
                                option.text
                            }}</BFormCheckbox>
                        </div>
                        <em class="fw-light" v-else>{{ input.emptyMessage }}</em>
                    </BFormCheckboxGroup>
                </BFormGroup>
                <BFormFloatingLabel v-else class="my-2" :label="input.label" :label-for="input.name">
                    <BFormInput v-model="booking[input.name]" :id="input.name" :type="input.type" />
                </BFormFloatingLabel>
            </template>
            <Button type="submit" class="mt-4 mx-0 block" variant="success"
                :disabled="store.guardian.children.length === 0">Send booking
                request</Button>
        </BForm>
    </div>
</template>

<script setup>
import { reactive, computed, inject } from 'vue'
import Button from '@/components/Button.vue'
import { store } from '@/stores/guardianStore'
import { useModalController } from 'bootstrap-vue-next'
const { hide } = useModalController()
const showToast = inject('showToast')

const childrenOptions = computed(() =>
    store.guardian.children.map((child) => ({
        value: child._id,
        text: `${child.firstName} ${child.lastName}`
    }))
)

const inputs = reactive([
    {
        label: 'Start date and time',
        type: 'datetime-local',
        name: 'startDateTime',
        required: true
    },
    { label: 'End date and time', type: 'datetime-local', name: 'endDateTime' },
    { label: 'Pick-up location', type: 'text', name: 'pickupLocation' },
    { label: 'Drop-off location', type: 'text', name: 'dropoffLocation' },
    { label: 'Description', type: 'text', name: 'description' },
    { label: 'Total cost (sek)', type: 'number', name: 'totalCost' },
    {
        label: 'Additional information',
        type: 'text',
        name: 'additionalInformation'
    },
    {
        label: 'Choose children for this booking:',
        type: 'checkboxGroup',
        name: 'children',
        emptyMessage: 'No children available',
        options: childrenOptions,
        required: true
    }
])

const booking = reactive({
    startDateTime: null,
    endDateTime: null,
    pickupLocation: '',
    dropoffLocation: '',
    description: '',
    totalCost: null,
    additionalInformation: '',
    children: []
})

const onSubmit = async (event) => {
    event.preventDefault()
    hide()
    try {
        await store.createBooking({
            ...booking,
            location: {
                pickupLocation: booking.pickupLocation,
                dropoffLocation: booking.dropoffLocation
            }
        });
        (booking.startDateTime = null),
            (booking.endDateTime = null),
            (booking.pickupLocation = ''),
            (booking.dropoffLocation = ''),
            (booking.description = ''),
            (booking.totalCost = null),
            (booking.additionalInformation = ''),
            (booking.children = []),
            showToast('Success', 'Successfully created booking', 'success')
    } catch (error) {
        showToast('Error', error.message, 'danger')
        console.error('Error creating booking:', error)
    }
}
</script>
