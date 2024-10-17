<template>
  <div id="app">
    <div id="nav"></div>
    <BToastOrchestrator />
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<script setup>
import { BToastOrchestrator } from 'bootstrap-vue-next'
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
</style>
