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
import { useModal } from 'bootstrap-vue-next'
const { hide } = useModal("child-modal");

const { child } = defineProps(['child'])
console.log(child);

const inputs = [
    { label: 'First name', type: 'text', name: 'firstName', },
    { label: 'Last name', type: 'text', name: 'lastName', },
    { label: 'Birthdate', type: 'date', name: 'birthDate', },
    { label: 'Special needs', type: 'text', name: 'specialNeed', },
    { label: 'Guardian', type: 'text', name: 'guardian', }
]

const form = reactive({
    firstName: child?.firstName,
    lastName: child?.lastName,
    birthDate: child?.birthDate,
    specialNeed: child?.specialNeed,
    guardian: child?.guardian,
})

const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(form));
    hide();
}

</script>