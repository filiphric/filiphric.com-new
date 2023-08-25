<template>
  <CldVideoPlayer
    v-if="isVideo(src)"
    width="full"
    height="auto"
    :src="src"
  />
  <Image
    v-else
    :src="'/' + src"
    :alt="alt"
    class="mb-14 mt-10 block"
  />
</template>
<script setup lang="ts">

defineProps({
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
  return videoExtensions.some(ext => src.endsWith(ext))
}

</script>
