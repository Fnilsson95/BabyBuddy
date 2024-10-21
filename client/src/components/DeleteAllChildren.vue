<template>
  <h5>Are you sure you want to delete all children?</h5>
  <div>
    <Button @click="deleteAll" variant="danger">Delete</Button>
  </div>
</template>
<script setup>
import { store } from '@/stores/guardianStore'
import { inject } from 'vue'
import { useModalController } from 'bootstrap-vue-next'
const { hide } = useModalController()
const showToast = inject('showToast')

const deleteAll = async () => {
  hide()
  try {
    await store.deleteAllChildren()
    showToast('Success', 'Successfully deleted all children', 'success')
  } catch (error) {
    showToast('Error', 'Could not delete all children', 'danger')
    console.error('Error deleting children:', error)
  }
}
</script>
