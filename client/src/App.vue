<template>
  <div id="app">
    <div id="nav"></div>
    <BToastOrchestrator />
    <div class="toast-wrapper">
      <Toast :configToast="toastConfig" />
    </div>
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<script setup>
import { BToastOrchestrator } from 'bootstrap-vue-next'
import Toast from './components/Toast.vue'
import { provide, ref } from 'vue'

const toastConfig = ref({
  title: '',
  body: '',
  variant: '',
  show: false
})

const showToast = (title, body, variant) => {
  toastConfig.value = { title, body, variant, show: true }
}

provide('showToast', showToast)
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.toast-wrapper {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
