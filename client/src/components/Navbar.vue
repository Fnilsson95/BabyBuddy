<template>
    <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
        <BNavbarBrand :to="homeRoute">BabyBuddy</BNavbarBrand> <!-- Dynamic Home Route -->
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem :to="homeRoute">Home</BNavItem> <!-- Adjusted Home Link -->
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
            <BAvatar :to="homeRoute" size="3em" />
        </BCollapse>
    </BNavbar>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()

    const userId = route.params.id
    const role = computed(() => (route.path.includes('guardian') ? 'guardian' : 'babysitter'))

    // Dynamic Home Route based on role and userId
    const homeRoute = computed(() => `/${userId}/${role.value}`)

    // Dynamic Bookings Route based on role and userId
    const bookingsRoute = computed(() => `/${userId}/${role.value}/bookings-history`)

    return {
      homeRoute,
      bookingsRoute
    }
  }
}
</script>
