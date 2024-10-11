<template>
  <BCard
    border-variant="primary"
    header="Booking for: Bonnie"
    header-bg-variant="primary"
    header-text-variant="white"
    align="center"
  >
    <template #header>
      <span>
        {{ booking.guardian.firstName }}
        {{ booking.guardian.lastName }}</span
      >
    </template>

    <BCardText>
      <div class="cardRow">
        <p>Can someone take care of my cat</p>
      </div>
      <div class="cardRow">
        <p class="label">Earning:</p>
        <p>${{ booking.totalCost }}</p>
      </div>
      <div class="cardRow">
        <p class="label">Date:</p>
        <p>{{ booking.startDateTime }}</p>
      </div>
      <div class="cardRow">
        <p class="label">Duration:</p>
        <p>{{ booking.duration }} hours</p>
      </div>
    </BCardText>
    <Modal ref="jobModal">
      <template #content>
        <JobModalContent :booking="booking" @apply-and-close="closeModal" />
      </template>
      <template #button>View Details</template>
    </Modal>
  </BCard>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue-next'
import Modal from './Modal.vue'

import JobModalContent from './JobModalContent.vue'

export default {
  name: 'Job',
  components: {
    BCard,
    BCardText,
    Modal,
    JobModalContent
  },
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$refs.jobModal.hide()
    }
  }
}
</script>

<style scoped>
.cardRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.apply-button-container {
  margin-top: 20px;
  text-align: center;
}

.apply-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.apply-button:hover {
  background-color: #0056b3;
}
</style>
