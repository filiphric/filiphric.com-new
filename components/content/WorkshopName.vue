<template>
  <ClientOnly>
    <p v-if="workshopQuery" class="inline">
      {{ workshopQuery }}
    </p>
    <p v-else class="inline">a workshop</p>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
const workshopQuery = useRouteQuery('workshop')
</script>
