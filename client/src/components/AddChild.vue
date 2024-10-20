<template>
    <BForm @submit="onSubmit">
        <BFormFloatingLabel class="my-2" v-for="input in inputs" :key="input.name" :label="input.label"
            :label-for="input.name">
            <BFormInput v-model="form[input.name]" :id="input.name" :type="input.type" />
        </BFormFloatingLabel>
        <div class="button-container">
            <Button type="submit" variant="success">Create child</Button>
        </div>
    </BForm>
</template>

<script>
import { reactive, defineProps } from 'vue'
import Button from '@/components/Button.vue'
import { formatDate } from '@/helpers';
import { useModalController } from 'bootstrap-vue-next'
import { store } from '@/stores/guardianStore';

export default {
    setup() {
        const { hide } = useModalController();

        const inputs = [
            { label: 'First name', type: 'text', name: 'firstName', },
            { label: 'Last name', type: 'text', name: 'lastName', },
            { label: 'Birth date', type: 'date', name: 'dateOfBirth' },
            { label: 'Special needs', type: 'text', name: 'specialNeeds', },
        ]
        const form = reactive({
            firstName: '',
            lastName: '',
            specialNeeds: '',
            dateOfBirth: formatDate(new Date().toDateString()),
            guardian: store.guardian._id
        })

        const onSubmit = async (event) => {
            event.preventDefault();
            hide();
            await store.createChild(form);
            form.firstName = '',
                form.lastName = '',
                form.specialNeeds = '',
                form.dateOfBirth = formatDate(new Date().toDateString())
        }

        return {
            inputs,
            form,
            onSubmit,
        }
    }
}
</script>

<style></style>