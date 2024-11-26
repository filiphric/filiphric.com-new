<template>
  <div v-if="post">
    <h2 class="mt-7 text-2xl font-bold">
      Latest blog post:
    </h2>
    <NuxtLink 
      :to="`/${post.slug}`" 
      class="mt-5 block bg-ivory-dark p-5 dark:bg-black-lighter"
      @click="useTrackEvent('sidebarLatestBlogClick')"
    >
      <Image :src="post.image" :alt="post.title" />
      <h2 class="text-2xl font-extrabold">
        {{ post.title }}
      </h2>
      <button class="text-lg mt-5 w-full bg-white dark:bg-black-lightest px-7 py-3 font-black uppercase hover:shadow-block-lime transition-all hover:-translate-y-2 border-2 border-black dark:border-black-dark hover:-translate-x-2">
          Read post
        </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { BlogPost } from '~/types/blog';

defineProps<{
  post: BlogPost | null
}>()
</script> 
