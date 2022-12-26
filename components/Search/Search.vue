<template>
  <div v-if="show" class="fixed h-screen w-screen bg-black-lighter opacity-80" @click.self="$emit('hide')" />
</template>
<script setup lang="ts">
defineEmits(['hide'])

defineProps({
  show: {
    type: Boolean
  }
})
</script>
