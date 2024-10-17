<template>
  <div class="earningCard">
    <p class="title">
      {{ title }}
    </p>
    <p class="value">{{ value }}$</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})
</script>

<style>
.earningCard {
  width: 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 6px 0px;
  border-radius: 4px;
  border: 1px solid #2f4f4f;
}

.title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}
.value {
  color: #2f4f4f;
  font-size: 20px;
  font-weight: 800;
  margin: 0;
}
</style>
