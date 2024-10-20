<template>
    <div class="pt-3">
        <BRow>
            <BCol>
                <div class="mt-20px">
                    <template v-if="store.guardian?.bookings?.length > 0">
                        <BCard v-for="booking in store.guardian.bookings" border-variant="dark" class="my-10"
                            :header="`Booking for: ${booking.children?.map((child) => child?.firstName).join(', ')}`"
                            header-bg-variant="warning" header-text-variant="dark" align="center">
                            <template v-if="booking.children">
                                <BCardText>{{ formatDate(booking.startDateTime) }}</BCardText>
                                <BCardText>Torsten is picking up {{ booking.children.length > 1 ? "the kids" :
                                    booking.children[0].firstName }} at {{
        booking.location.pickupLocation }}
                                    and dropping {{ booking.children.length > 1 ? "them" : "him/her" }} off at {{
                                        booking.location.dropoffLocation
                                    }}</BCardText>
                            </template>
                            <em v-else>No children for this booking</em>
                        </BCard>
                    </template>
                    <em class="header-box" v-else>No upcoming bookings</em>
                </div>
            </BCol>
        </BRow>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate } from '@/helpers';
import { useRoute } from 'vue-router';
import { store } from '@/stores/guardianStore';
console.log("store:", store);
</script>

<style>
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