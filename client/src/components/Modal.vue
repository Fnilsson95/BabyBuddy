<template>
  <Button variant="primary" @click="isOpen = !isOpen">
    <slot name="button">Edit child</slot>
  </Button>

  <BModal title="Overflowing Content" v-model="isOpen" :hide-footer="true">
    <slot name="content">Default content</slot>
  </BModal>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isOpen = ref(false)

    const closeModal = () => {
      isOpen.value = false
    }

    return {
      isOpen,
      closeModal
    }
  }
}
</script>
