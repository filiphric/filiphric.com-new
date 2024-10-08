<template>
  <CldVideoPlayer
    v-if="isVideo(src)"
    :width="640"
    :height="360"
    :src="src"
    :aspectRatio="16/9"
  />
  <Image
    v-else
    :src="'/' + src"
    :alt="alt"
    class="mb-14 mt-10 block"
  />
</template>

<script setup lang="ts">

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})

const isVideo = (src: string) => {
  const videoExtensions = ['.mp4', '.avi', '.mov']
  return videoExtensions.some(ext => src.toLowerCase().endsWith(ext))
}

</script>

<style>
.cld-video-player {
  max-width: 100%;
  margin: 1rem 0;
}
</style>
