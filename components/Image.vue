<template>
  <img :src="url" :alt="alt">
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    default: '',
    type: String
  },
  alt: {
    required: true,
    type: String
  },
  width: {
    default: 'full',
    type: [String, Number]
  },
  height: {
    default: 'auto',
    type: [String, Number]
  }
})

const { url } = useCldImageUrl({
  options: {
    width: props.width,
    height: props.height,
    src: props.src
  }
})
</script>
