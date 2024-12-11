<template>
  <div class="col-span-2 hidden lg:block sticky top-5 max-h-[calc(100vh-40px)] overflow-y-auto">
    <div v-if="links.length">
      <h2 class="text-2xl font-bold pt-5 pb-2">
        Table of contents:
      </h2>
      <ul>
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="'#' + link.id"
          class="prettyLink block max-w-fit"
        >
          {{ link.text }}
        </NuxtLink>
      </ul>
    </div>
    <hr class="my-5 opacity-20" />
    <slot />
  </div>
</template>

<script setup lang="ts">


defineProps<{ links: Array<{
  id: string,
  text: string
}> }>()


</script>
