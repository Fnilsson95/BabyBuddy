<template>
  <BToast
    v-model="isActive"
    :title="configToast.title"
    :variant="configToast.variant"
    :auto-hide-delay="3000"
  >
    {{ configToast.body }}
  </BToast>
</template>

<script setup>
import { BToast } from 'bootstrap-vue-next'
import { ref, watch } from 'vue'

const props = defineProps({
  configToast: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Default Title',
      variant: 'info',
      body: 'Default body text',
      show: false
    })
  }
})

const isActive = ref(false)

const showToast = () => {
  isActive.value = true
}

watch(
  () => props.configToast,
  (newConfig) => {
    if (newConfig.show) {
      showToast()
    }
  },
  { deep: true }
)

defineExpose({ showToast })
</script>
