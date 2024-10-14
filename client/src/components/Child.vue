<template>
    <div class="pt-3">
        <button
            @click="store.updateGuardian({ name: { firstName: 'Johannes', lastName: store.guardian.name.lastName } })">Change
            name on
            {{
                store.guardian.name.firstName
            }} from the Child component</button>
        <BCardGroup deck>
            <BCard v-for="child in store.guardian.children" :title="`${child.name.firstName} ${child.name.lastName}`"
                header-tag="header" :key="child._id">
                <template #header>
                    <div class="mb-0 img-container">
                        <BImg class="img" src="src/assets/Gösta.jpeg" fluid alt="Responsive image" />
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
                    <template #button>Edit {{ child.firstName }}</template>
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
import { guardianApi } from '@/api/guardians'
import { store } from '@/stores/guardianStore'

</script>
