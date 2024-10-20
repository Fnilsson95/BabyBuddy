<template>
    <div class="pt-3">
        <BRow>
            <BCol>
                <BCard class="w-100" v-for="child in store.guardian.children" border-variant="dark"
                    :title="`${child.firstName} ${child.lastName}`" header-tag="header" :key="child._id">
                    <template #header>
                        <div>
                            <BAvatar variant="warning" text-variant="info"
                                :text="`${child.firstName.charAt(0)}${child.lastName.charAt(0)}`" />
                        </div>
                    </template>
                    <BCardText>
                        <div>
                            {{ formatDate(child.dateOfBirth) }}
                        </div>
                        <div>
                            {{ child.specialNeeds }}
                        </div>
                    </BCardText>
                    <Modal title="Edit information">
                        <template #content>
                            <ChildForm :child="child" />
                        </template>
                        <template #button>Edit {{ child.firstName }}</template>
                    </Modal>
                </BCard>
            </BCol>
        </BRow>
    </div>
</template>


<script setup>
import Modal from './Modal.vue'
import ChildForm from '@/components/ChildForm.vue'
import { store } from '@/stores/guardianStore'
import { formatDate } from '@/helpers';
</script>
<style></style>