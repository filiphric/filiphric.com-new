<template>
  <div class="text-sm text-gray-500 pt-1">
    <span v-if="isLoading" class="animate-pulse">Loading views...</span>
    <span v-else>{{ views }} views</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  slug: string
}>()

const views = ref(0)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`/api/views/${props.slug}`)
    const data = await response.json()
    views.value = data.views
  } catch (error) {
    console.error('Failed to fetch view count:', error)
  } finally {
    isLoading.value = false
  }
})
</script> 