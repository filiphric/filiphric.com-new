<template>
  <NuxtPicture :src="image" class="place-self-center self-center mix-blend-lighten md:w-full" />
</template>
<script setup lang="ts">
defineProps({
  image: {
    type: String,
    default: ''
  }
})

</script>
