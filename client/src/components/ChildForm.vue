<template>
    <BForm @submit="onSubmit">
        <BFormFloatingLabel class="my-2" v-for="input in inputs" :key="input.name" :label="input.label"
            :label-for="input.name">
            <BFormInput v-model="form[input.name]" :id="input.name" :type="input.type" />
        </BFormFloatingLabel>
        <div class="button-container">
            <Button type="submit" variant="outline-success">Submit</Button>
            <Button @click="onDelete" variant="outline-danger"> Delete child </Button>
        </div>
    </BForm>
</template>

<script setup>
import { reactive, defineProps } from 'vue'
import Button from '@/components/Button.vue'
import { useModalController } from 'bootstrap-vue-next'
import { store } from '@/stores/guardianStore';
const { hide } = useModalController();

const { child } = defineProps(['child'])


const inputs = [
    { label: 'First name', type: 'text', name: 'firstName', },
    { label: 'Last name', type: 'text', name: 'lastName', },
    { label: 'Special needs', type: 'text', name: 'specialNeeds', },
]

const form = reactive({
    firstName: child?.firstName || '',
    lastName: child?.lastName || '',
    specialNeeds: child?.specialNeeds || '',
})

const onSubmit = async (event) => {
    event.preventDefault();
    hide();
    await store.updateChild({ ...child, ...form });
}

const onDelete = async () => {
    hide();
    await store.deleteChild(child._id);
}


</script>

<style scoped>
.button-container {
    color: solid #3c5c5e;
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
}
</style>