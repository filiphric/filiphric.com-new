<template>
  <div class="mx-2 grid items-center bg-white p-9 dark:bg-black-lighter md:mx-0 shadow-block" data-cy="course-item">
    <div class="relative">
      <NuxtLink :to="item.comingSoon ? '#' : '/course/' + item.slug" @click="item.comingSoon ? null : useTrackEvent('Course - ' + item.title)">
        <Image 
          :src="item.image" 
          :class="['mb-7', { 'filter blur-md': item.comingSoon }]" 
          :alt="item.title" 
        />
        <div v-if="item.comingSoon" class="absolute top-[40%] left-0 w-full transform -translate-y-1/2 text-white text-center py-2 font-bold uppercase text-2xl shadow-md bg-black bg-opacity-85" style="transform: rotate(-5deg);">
          Coming Soon
        </div>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink :to="item.comingSoon ? '#' : '/course/' + item.slug">
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
      </NuxtLink>
      <div class="mt-7">
        {{ item.description }}
      </div>
      <NuxtLink v-if="!item.comingSoon" :to="'/course/' + item.slug" class="animatedIcon prettyLink animatedIcon mt-7 inline-block font-bold">
        Learn more <IconArrowForward class="inline transition-all ease-in-out" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    description: string,
    priceId: string,
    comingSoon?: boolean
  }
}>()

</script>
