<template>
  <div 
    class="grid grid-cols-1 md:gap-14 md:grid-cols-3 items-center bg-white p-9 dark:bg-black-lighter md:mx-0 border-2 border-black" 
    :class="blockClass"
    data-cy="course-item"
  >
    <div class="relative">
      <NuxtLink 
        :to="item.coming_soon ? undefined : item.url"
        @click="useTrackEvent('Course - ' + item.title)"
      >     
        <Image 
          :src="item.image_url" 
          :class="['w-full', { 'filter blur-md': item.coming_soon }]" 
          :alt="item.title" 
        />
        <div v-if="item.coming_soon" class="absolute top-[40%] left-0 w-full transform -translate-y-1/2 text-white text-center py-2 font-bold uppercase text-2xl shadow-md bg-black bg-opacity-85" style="transform: rotate(-5deg);">
          Coming Soon
        </div>
      </NuxtLink>
    </div>
    <div class="col-span-2 grid grid-cols-1 space-y-7">
      <div>
        <NuxtLink
          :to="item.coming_soon ? undefined : item.url"
          class="animatedIcon animatedIcon inline-block font-bold"
        >
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
        </NuxtLink>
      </div>
      <div class="text-lg">
        {{ item.description }}
      </div>
      <div v-if="item.coming_soon" class="align-content-end">
        <ActionButton
          to="/newsletter"
        >Get notified
        </ActionButton>
      </div>
      <div v-else class="align-content-end">
        <ActionButton
          :to="item.url"
        >Go to course page
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from '~/types/courses';
import ActionButton from '../ActionButton.vue';

const props = defineProps<{
  item: Course,
  colorIndex: number
}>()

const blockClass = computed(() => useColorCycle(props.colorIndex))
</script>
