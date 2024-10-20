<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="nav-link" to="/" @click="setActiveLink('/')">BabyBuddy</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ active: isActive('/') }" @click="setActiveLink('/')">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/availability" class="nav-link" :class="{ active: isActive('/availability') }"
              @click="setActiveLink('/availability')">
              Manage Availability
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bookings" class="nav-link" :class="{ active: isActive('/bookings') }"
              @click="setActiveLink('/bookings')">
              Bookings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/earnings" class="nav-link" :class="{ active: isActive('/earnings') }"
              @click="setActiveLink('/earnings')">
              Earnings
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const activeLink = ref('/')

    const isActive = computed(() => (path) => {
      return path === route.path
    })

    const setActiveLink = (path) => {
      activeLink.value = path
    }

    return { isActive, setActiveLink }
  },
  mounted() {
    // Initialize Bootstrap's JavaScript components
  }
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
