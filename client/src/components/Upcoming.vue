<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard v-for="child in children" border-variant="primary" :header="`Booking for: ${child.name.firstName}`"
                header-bg-variant="primary" header-text-variant="white" align="center">
                <BCardText></BCardText>
                <BCardText>Torsten is picking up {{ child.name.firstName }} at kindergarden</BCardText>
            </BCard>
        </BCardGroup>
    </div>
</template>

<script>

import { guardianApi } from '@/api/guardians'
import { bookingApi } from '@/api/bookings'

export default {
    data() {
        return {
            children: []
        }
    },
    async mounted() {
        try {
            const guardianID = "66f155b3a06011d345d4d627"
            const guardian = await guardianApi.getGuardian(guardianID);

            this.children = guardian.children.map(child => {
                return {
                    ...child,
                    dateOfBirth: new Date(child.dateOfBirth),
                }
            })
        } catch (error) { }
    }
}
</script>