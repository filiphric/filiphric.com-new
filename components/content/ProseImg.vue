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
    :width="width"
    :height="height"
    :class="customClass"
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
  },
  width: {
    type: [String, Number],
    default: 'full'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  customClass: {
    type: String,
    default: undefined
  }
})

const isVideo = (src: string) => {
  const videoExtensions = ['.mp4', '.avi', '.mov']
  return videoExtensions.some(ext => src.endsWith(ext))
}

</script>
