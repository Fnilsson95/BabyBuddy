<template>
    <div class="pt-3">
        <BForm @submit="onSubmit">
            <template v-for="input in inputs" key="input.name">
                <b-form-group v-if="input.type === 'checkboxGroup'" :label="input.label">
                    <b-form-checkbox-group v-model="booking[input.name]" :name="input.name">
                        <b-form-checkbox v-for="option in input.options" :value="option.value">{{ option.text
                        }}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <BFormFloatingLabel v-else class="my-2" :label="input.label" :label-for="input.name">
                    <BFormInput v-model="booking[input.name]" :id="input.name" :type="input.type" />
                </BFormFloatingLabel>
            </template>
            <Button type="submit" variant="primary">Send request</Button>
        </BForm>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Button from '@/components/Button.vue'
import { store } from '@/stores/guardianStore';
import { useModalController } from 'bootstrap-vue-next'
const { hide } = useModalController();

const childrenOptions = computed(() =>
    store.guardian.children.map((child) => ({ value: child._id, text: `${child.firstName} ${child.lastName}` }))
);

const inputs = reactive([
    { label: 'Start date and time', type: 'datetime-local', name: 'startDateTime' },
    { label: 'End date and time', type: 'datetime-local', name: 'endDateTime' },
    { label: 'Pick-up location', type: 'text', name: 'pickupLocation' },
    { label: 'Drop-off location', type: 'text', name: 'dropoffLocation' },
    { label: 'Description', type: 'text', name: 'description' },
    { label: 'Total cost (sek)', type: 'number', name: 'totalCost' },
    { label: 'Additional information', type: 'text', name: 'additionalInformation' },
    {
        label: 'Choose children for this booking',
        type: 'checkboxGroup',
        name: 'children',
        options: childrenOptions
    },
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
    console.log(JSON.stringify(booking))
    hide();
    await store.createBooking({
        ...booking,
        location: {
            pickupLocation: booking.pickupLocation,
            dropoffLocation: booking.dropoffLocation,
        }
    });
}
</script>
