<template>
  <BCard>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 0;
      "
    >
      <p style="font-size: 16px; font-weight: 600; margin: 0">Pending:</p>
      <p style="font-size: 24px; font-weight: 800; margin: 0">€1000</p>
    </div>
  </BCard>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue-next'

export default {
  name: 'earning-card'
}
</script>

<style></style>
