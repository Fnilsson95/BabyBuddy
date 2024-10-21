<template>
  <BForm @submit="onSubmit">
    <BFormFloatingLabel
      class="my-2"
      v-for="input in inputs"
      :key="input.name"
      :label="input.label"
      :label-for="input.name"
    >
      <BFormInput
        v-model="form[input.name]"
        :id="input.name"
        :type="input.type"
      />
    </BFormFloatingLabel>
    <div class="button-container">
      <Button type="submit" variant="success">Create child</Button>
    </div>
  </BForm>
</template>

<script setup>
import { reactive, inject } from 'vue'
import Button from '@/components/Button.vue'
import { formatDate } from '@/helpers'
import { useModalController } from 'bootstrap-vue-next'
import { store } from '@/stores/guardianStore'

const { hide } = useModalController()
const showToast = inject('showToast')

const inputs = [
  { label: 'First name', type: 'text', name: 'firstName' },
  { label: 'Last name', type: 'text', name: 'lastName' },
  { label: 'Birth date', type: 'date', name: 'dateOfBirth' },
  { label: 'Special needs', type: 'text', name: 'specialNeeds' }
]

const form = reactive({
  firstName: '',
  lastName: '',
  specialNeeds: '',
  dateOfBirth: formatDate(new Date().toDateString()),
  guardian: store.guardian._id
})
const onSubmit = async (event) => {
  event.preventDefault()
  hide()
  try {
    await store.createChild(form)
    ;(form.firstName = ''),
      (form.lastName = ''),
      (form.specialNeeds = ''),
      (form.dateOfBirth = formatDate(new Date().toDateString()))
    showToast('Success', 'Successfully added child', 'success')
  } catch (error) {
    showToast('Error', 'Could not add child', 'danger')
    console.error('Error creating child:', error)
  }
}
</script>
<style></style>
