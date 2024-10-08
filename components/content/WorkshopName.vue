<template>
  <p class="inline">
    {{ workshop }}
  </p>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
const workshopQuery = useRouteQuery('workshop')
const workshop = workshopQuery.value?.length ? workshopQuery.value : 'a workshop'
</script>
