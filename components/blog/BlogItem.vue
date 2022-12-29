<template>
  <NuxtLink :to="item.slug">
    <div v-if="item.image" class="w-48">
      <nuxt-picture :src="item.image" class="md:w-full" />
    </div>
    {{ item.title }}
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    date: string,
    readingTime: string
  }
}>()

</script>
