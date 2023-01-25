<template>
  <video
    v-if="isVideo(src)"
    autoplay
    loop
    :src="data + '/' + src"
  />
  <NuxtPicture
    v-else
    :src="'/' + src"
    :alt="alt"
    :width="width"
    :height="height"
    class="mt-10 mb-14 block"
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
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
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
