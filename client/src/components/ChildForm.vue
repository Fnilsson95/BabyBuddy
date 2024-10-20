<template>
    <BForm @submit="onSubmit">
        <BFormFloatingLabel class="my-2" v-for="input in inputs" :key="input.name" :label="input.label"
            :label-for="input.name">
            <BFormInput v-model="form[input.name]" :id="input.name" :type="input.type" />
        </BFormFloatingLabel>
        <div class="button-container">
            <Button type="submit" variant="success">Submit</Button>
            <Button @click="onDelete" variant="danger"> Delete child </Button>
        </div>
    </BForm>
</template>

<script setup>
import { reactive, defineProps, inject } from 'vue'
import Button from '@/components/Button.vue'
import { useModalController } from 'bootstrap-vue-next'
import { store } from '@/stores/guardianStore'

const { hide } = useModalController();
const showToast = inject('showToast')
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
    try {
        await store.updateChild({ ...child, ...form });
        showToast('Success', 'Successfully edited child information', 'success')
    } catch (error) {
        showToast('Error', 'Could not edit information', 'danger')
        console.error('Error editing child:', error)
    }
}
const onDelete = async () => {
    hide();
    try {
        await store.deleteChild(child._id);
        showToast('Success', 'Successfully deleted child', 'success')
    } catch (error) {
        showToast('Error', 'Could not delete child', 'danger')
        console.error('Error deleting child:', error)
    }
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