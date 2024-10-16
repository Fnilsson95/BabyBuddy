<template>
  <BNavbar
    toggleable="lg"
    v-b-color-mode="'dark'"
    style="background-color: #2f4f4f; font-size: 18px; font-weight: 600"
  >
    <BNavbarBrand :to="homeRoute">BabyBuddy</BNavbarBrand>
    <!-- Dynamic Home Route -->
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem :to="homeRoute" :active="$route.path === homeRoute">Home</BNavItem>
        <!-- Adjusted Home Link -->
        <BNavItem :to="bookingsRoute" :active="$route.path === bookingsRoute">Bookings</BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem @click="openProfileModal">See Profile</BDropdownItem>
          <BDropdownItem to="/login">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>

  <!-- Profile Modal -->
  <ProfileModal v-if="showModal" @close="showModal = false" />
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileModal from '@/components/ProfileModal.vue'

export default {
  components: {
    ProfileModal
  },
  setup() {
    const route = useRoute()
    const userId = route.params.id
    const role = computed(() => (route.path.includes('guardian') ? 'guardian' : 'babysitter'))

    const homeRoute = computed(() => `/${userId}/${role.value}`)
    const bookingsRoute = computed(() => `/${userId}/${role.value}/bookings-history`)

    // State for showing/hiding the modal
    const showModal = ref(false)

    const openProfileModal = () => {
      showModal.value = true
    }

    return {
      homeRoute,
      bookingsRoute,
      showModal,
      openProfileModal
    }
  }
}
</script>
