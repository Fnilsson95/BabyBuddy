<template>
  <div class="modal-header">
    <h2 class="profile-header">Profile Information</h2>
    <button @click="$emit('close')" class="close-btn">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'ModalHeader'
}
</script>

<style scoped>
.modal-header {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.profile-header {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
}

.close-btn {
  margin-left: auto;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
