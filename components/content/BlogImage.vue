<template>
  <div v-if="mode === 'light'">
    <nuxt-img :src="lightImage" class="place-self-center self-center mix-blend-lighten md:w-full" />
  </div>
  <div v-if="mode === 'dark'">
    <nuxt-img :src="darkImage" class="place-self-center self-center mix-blend-lighten md:w-full" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  mode: {
    type: String,
    default: 'none'
  },
  darkImage: {
    type: String,
    default: ''
  },
  lightImage: {
    type: String,
    default: ''
  }
})

console.log(props.mode)

</script>
