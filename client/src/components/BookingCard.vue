<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        {{ booking.guardian.firstName }}
        {{ booking.guardian.lastName }}</slot
      >
    </div>

    <div class="card-body">
      <div class="cardRow">
        <p class="information">{{ booking.description }}</p>
      </div>
      <div class="cardRow">
        <p v-if="cardType === 'babysitter'" class="label">Earning:</p>
        <p v-if="cardType === 'guardian'" class="label">Cost:</p>
        <p class="information">${{ booking.totalCost }}</p>
      </div>
      <div class="cardRow">
        <p class="label">Date:</p>
        <p class="information">{{ formatDate(booking.startDateTime) }}</p>
      </div>
      <div class="cardRow">
        <p class="label">Duration:</p>
        <p class="information">
          {{ calculateDuration(booking.startDateTime, booking.endDateTime) }}
          hours
        </p>
      </div>
      <div class="cardRow">
        <p class="label">Status:</p>
        <p class="information">
          {{ booking.status }}
        </p>
      </div>

      <slot name="button"></slot>
    </div>
  </div>
</template>

<script setup>
import { calculateDuration, formatDate } from '@/helpers'

const props = defineProps({
  booking: {
    type: Object,
    required: true
  },
  cardType: {
    type: String,
    required: false,
    default: 'babysitter'
  }
})
</script>

<style scoped>
.card {
  background-color: white;
  color: #555;
  border: 1px solid #2f4f4f;
  min-width: 180px;
  max-width: 340px;
  width: 100%;
}

.card-header {
  width: 100%;
  background-color: #2f4f4f;
  font-weight: 800;
  font-size: 18px;
  color: #f5f5f5;
}

.card-body {
  padding: 16px;
}

.cardRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.label {
  font-weight: 500;
  font-size: 14px;
}

.information {
  /*Apply Tailwinds line-clamp styling for content that fills up multiple rows*/
  font-size: 16px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apply-button {
  background-color: #2f4f4f;
  color: #f5f5f5;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.apply-button:hover {
  background-color: rgba(47, 79, 79, 0.5);
  transform: scale(1.05);
}
</style>
