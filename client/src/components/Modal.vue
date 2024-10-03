<template>
    <Button variant="primary" @click="isOpen = !isOpen">
        <slot name="button">Edit child</slot>
    </Button>

    <BModal title="Overflowing Content" v-model="isOpen" :hide-footer="true">
        <slot name="content">Default content</slot>
    </BModal>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'
const isOpen = ref(false)
</script>