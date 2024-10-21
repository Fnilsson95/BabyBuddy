<template>
  <div>
    <Navbar></Navbar>
    <div class="guardian-container">
      <BContainer class="guardian-box">
        <BRow>
          <BCol lg="4">
            <div class="pt-5">
              <h2>Book a babysitter</h2>
              <Booking />
            </div>
          </BCol>
          <BCol lg="4">
            <div class="pt-5">
              <h2>Upcoming bookings</h2>
              <Upcoming />
            </div>
          </BCol>
          <BCol lg="4">
            <div class="pt-5">
              <h2>My children</h2>
              <div class="custom-row">
                <div class="custom-col">
                  <Modal title="Add information" buttonType="outline-success">
                    <template #content>
                      <AddChild />
                    </template>
                    <template #button>
                      Add Child
                    </template>
                  </Modal>
                </div>
                <div class="custom-col" v-if="store.guardian.children.length > 0">
                  <Modal title="Delete all children?" buttonType="outline-danger">
                    <template #content>
                      <DeleteAllChildren />
                    </template>
                    <template #button>
                      Delete all children
                    </template>
                  </Modal>
                </div>
              </div>
              <Child v-if="store.guardian.children.length > 0" />
              <div class="header-box" v-else>
                <em>No children added yet</em>
              </div>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Navbar from '@/components/Navbar.vue'
import Booking from '@/components/Booking.vue'
import Upcoming from '@/components/Upcoming.vue'
import Child from '@/components/Child.vue'
import Modal from '@/components/Modal.vue'
import AddChild from '@/components/AddChild.vue'
import { guardianApi } from '../api/v1/guardians'
import { store } from '@/stores/guardianStore'
import { useRoute } from 'vue-router';

export default {
  name: 'guardian',
  components: {
    Button,
    Navbar,
    Booking,
    Upcoming,
    Child,
    Modal,
    AddChild
  },
  components: {},

  setup() {
    const route = useRoute()
    return { store, route }
  },
  async mounted() {
    const guardianId = this.route.params.id
    const guardian = await guardianApi.getGuardian(guardianId);
    store.setGuardian(guardian);
  }
}

</script>

<style scoped>
.guardian-container {
  background-color: #e0f7e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 40px;
}

.guardian-box {
  background-color: #ffffff;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  border-radius: 15px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: auto;
}

.img-container {
  aspect-ratio: 1;
  overflow: hidden;
}

.custom-col {
  margin: 12px;
}

.custom-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.header-box {
  border: 1px solid #3c5c5e;
  background-color: #e0f7e9;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  width: 60%;
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>