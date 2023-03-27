<template>
  <p class="inline">
    {{ workshop }}
  </p>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
const workshop = useRouteQuery('workshop')
</script>
