<template>
  <video
    v-if="isVideo(src)"
    autoplay
    loop
    :src="data + '/' + src"
  />
  <Image
    v-else
    :src="'/' + src"
    :alt="alt"
    :width="width"
    :height="height"
    :class="customClass"
    :quality="quality"
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
    default: 900
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  quality: {
    type: [String, Number],
    default: 60
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

// @ts-ignore
const { data } = await useAsyncData('cloudinaryBaseUrl', ({ $img }) => {
  // path to cloudinary baseURL
  return $img.options.providers.cloudinary.defaults.baseURL.replace('image', 'video')
})

</script>
