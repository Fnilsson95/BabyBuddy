<template>
    <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
        <BNavbarBrand to="/guardian">BabyBuddy</BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem to="/guardian">Home</BNavItem>
                <BNavItem :to="bookingsRoute">Bookings</BNavItem>
            </BNavbarNav>
            <!-- Right aligned nav items -->
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                <BNavItemDropdown right>
                    <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <BDropdownItem href="#">Profile</BDropdownItem>
                    <BDropdownItem href="#">My kids</BDropdownItem>
                    <BDropdownItem to="/login">Sign Out</BDropdownItem>
                </BNavItemDropdown>
            </BNavbarNav>
            <BAvatar to="/guardian" size="3em" />
        </BCollapse>
    </BNavbar>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue' // Import computed from Vue

export default {
  setup() {
    const route = useRoute()

    const bookingsRoute = computed(() => {
      // Extract role (guardian or babysitter) and user ID from the URL
      const role = route.path.includes('guardian') ? 'guardian' : 'babysitter'
      const userId = route.params.id || 'defaultUserId' // Provide fallback if no user ID is found

      // Build the dynamic bookings URL based on the role and userId
      return `/${userId}/${role}/bookings`
    })

    return {
      bookingsRoute
    }
  }
}
</script>
