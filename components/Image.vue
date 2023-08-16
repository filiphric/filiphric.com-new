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
  }
})

const { url } = useCldImageUrl({
  options: {
    width: 'full',
    height: 'auto',
    src: props.src
  }
})
</script>
