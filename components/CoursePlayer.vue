<script setup lang="ts">
  import "@mux/mux-player";
  import "@mux/mux-player/themes/minimal";
  const props = defineProps({
    playbackId: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <mux-player
    :playback-id="props.playbackId"
    theme="minimal"
  />
</template>