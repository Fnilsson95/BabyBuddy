<template>
    <BForm @submit="onSubmit">
        <BFormFloatingLabel class="my-2" v-for="input in inputs" :key="input.name" :label="input.label"
            :label-for="input.name">
            <BFormInput v-model="form[input.name]" :id="input.name" :type="input.type" />
        </BFormFloatingLabel>
        <Button type="submit" variant="primary">Submit</Button>
    </BForm>
</template>

<script setup>
import { reactive, defineProps } from 'vue'
import Button from '@/components/Button.vue'
import { useModalController } from 'bootstrap-vue-next'
import { store } from '@/stores/guardianStore';
const { hide, modal } = useModalController();

const { child } = defineProps(['child'])
console.log(child);

const inputs = [
    { label: 'First name', type: 'text', name: 'firstName', },
    { label: 'Last name', type: 'text', name: 'lastName', },
    { label: 'Birthdate', type: 'date', name: 'birthDate', },
    { label: 'Special needs', type: 'text', name: 'specialNeed', },
]

const form = reactive({
    firstName: child?.name.firstName,
    lastName: child?.name.lastName,
    birthDate: child?.birthDate,
    specialNeed: child?.specialNeeds,
})

const onSubmit = async (event) => {
    event.preventDefault();
    await store.updateChild({ ...child, ...form, name: { firstName: form.firstName, lastName: form.lastName } });
    hide();
}
</script>