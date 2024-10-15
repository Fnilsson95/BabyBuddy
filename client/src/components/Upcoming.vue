<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard v-for="child in store.guardian.children" border-variant="primary"
                :header="`Booking for: ${child.name.firstName}`" header-bg-variant="primary" header-text-variant="white"
                align="center">
                <BCardText>date</BCardText>
                <BCardText>Torsten is picking up {{ child.name.firstName }} at kindergarden</BCardText>
            </BCard>
        </BCardGroup>
    </div>
</template>

<script setup>
import { store } from '@/stores/guardianStore'
</script>