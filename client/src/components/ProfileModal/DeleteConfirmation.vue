<template>
  <div>
    <p>Are you sure you want to delete your account?</p>
    <div class="button-group">
      <button @click="$emit('deleteAccount')" class="confirm-btn">Yes</button>
      <button @click="$emit('cancelDelete')" class="cancel-btn">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmation'
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  flex: 1 1 calc(48% - 10px);
  margin-right: 10px;
  margin-bottom: 10px;
}

.button-group button:last-child {
  margin-right: 0;
}

.confirm-btn,
.cancel-btn {
  background-color: #2f4f4f;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
}

.cancel-btn {
  background-color: #d9534f;
}

.confirm-btn:hover,
.cancel-btn:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .button-group button {
    flex: 1 1 100%;
    margin-right: 0;
  }
}
</style>
