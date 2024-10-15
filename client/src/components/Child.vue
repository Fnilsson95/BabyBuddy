<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard v-for="child in store.guardian.children" :title="`${child.name.firstName} ${child.name.lastName}`"
                header-tag="header" :key="child._id">
                <template #header>
                    <div>
                        <BAvatar bg-variant="primary" text-variant="info"
                            :text="`${child.name.firstName.charAt(0)}${child.name.lastName.charAt(0)}`" />
                    </div>
                </template>
                <BCardText>
                    <div>
                        <!-- {{ child.dateOfBirth.toDateString() }} -->
                        {{ child.dateOfBirth }}
                    </div>
                    <div>
                        {{ child.specialNeeds ? child.specialNeeds : 'No special needs' }}
                    </div>
                </BCardText>
                <Modal>
                    <template #content>
                        <ChildForm :child="child" />
                    </template>
                    <template #button>Edit {{ child.name.firstName }}</template>
                </Modal>
            </BCard>
        </BCardGroup>
    </div>
</template>

<style scoped>
.img-container {
    aspect-ratio: 1;
    overflow: hidden;
}

.img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>

<script setup>
import Modal from './Modal.vue'
import ChildForm from '@/components/ChildForm.vue'
import { store } from '@/stores/guardianStore'
</script>
