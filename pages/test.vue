<template>
  <!-- <button @click="getCountry()">
    Click me
  </button> -->
  <div>{{ data }}</div>
</template>
<script setup lang="ts">
// const country = ref()
const { data } = await useFetch('/api/location', {
  server: false
})

</script>
