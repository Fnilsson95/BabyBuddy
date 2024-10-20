<template>
    <h3>Are you sure you want to delete all children?</h3>
    <div>
        <Button @click="deleteAll" variant="danger">Delete all children</Button>
    </div>
</template>
<script setup>
import { store } from '@/stores/guardianStore';
import { useModalController } from 'bootstrap-vue-next'
const { hide } = useModalController();

const deleteAll = async () => {
    await store.deleteAllChildren()
    hide();
}
</script>