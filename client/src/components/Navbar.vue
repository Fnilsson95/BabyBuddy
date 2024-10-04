<template>
    <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
        <BNavbarBrand to="/guardian">BabyBuddy</BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem to="/guardian">Home</BNavItem>
                <BNavItem to="#" disabled>Bookings</BNavItem>
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