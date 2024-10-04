<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard v-for="child in children" :title="`${child.firstName} ${child.lastName}`" header-tag="header">
                <template #header>
                    <div class="mb-0 img-container">
                        <BImg class="img" src="src/assets/Gösta.jpeg" fluid alt="Responsive image" />
                    </div>
                </template>
                <BCardText>
                    <div>
                        {{ child.birthDate.toDateString() }}
                    </div>
                    <div>
                        {{ child.specialNeed ? child.specialNeed : 'No special needs' }}
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
import { ref } from 'vue'

const children = ref([{
    firstName: 'Bonnie',
    lastName: 'Olmås',
    birthDate: new Date("2024-05-02"),
    specialNeed: '',
    guardian: 'Emma',
    profilePic: undefined
},
{
    firstName: 'Gösta',
    lastName: 'Olmås',
    birthDate: new Date("2020-06-07"),
    specialNeed: 'Afraid of dogs',
    guardian: 'Emma',
    profilePic: 'src/assets/Gösta.jpeg'
}])
</script>
