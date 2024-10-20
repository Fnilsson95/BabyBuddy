<template>
  <Button :variant="buttonType ? buttonType : 'outline-warning'" @click="isOpen = !isOpen">
    <slot name="button"></slot>
  </Button>

  <BModal :title="title" v-model="isOpen" :hide-footer="true">
    <slot name="content">Default content</slot>
  </BModal>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ["title", "buttonType"],

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
