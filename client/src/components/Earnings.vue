<template>
  <BRow>
    <BCol xs="12">
      <div class="pt-5">
        <h2>Earnings</h2>
        <BRow class="justify-content-center">
          <BCol xs="6" md="2">
            <Earningcard />
          </BCol>
          <BCol xs="6" md="2">
            <Earningcard />
          </BCol>
          <BCol xs="6" md="2">
            <Earningcard />
          </BCol>
        </BRow>
      </div>
    </BCol>
  </BRow>
</template>

<script>
import Earningcard from './Earningcard.vue'

export default {
  name: 'earnings'
}
</script>

<style></style>
