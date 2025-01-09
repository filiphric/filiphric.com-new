<template>
  <div 
    class="mx-2 grid items-center bg-white p-9 dark:bg-black-lighter md:mx-0 border-2 border-black" 
    :class="blockClass"
    data-cy="course-item"
  >
    <div class="relative">
      <component :is="isExternal ? 'a' : 'NuxtLink'" 
        :href="isExternal ? (item as ExternalCourseItem).url : undefined"
        :to="!isExternal ? getInternalLink(item as InternalCourseItem) : undefined"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener' : undefined"
        @click="!isExternal ? useTrackEvent('Course - ' + item.title) : null"
      >
        <Image 
          :src="item.image_url" 
          :class="['mb-7', { 'filter blur-md': isInternal && (item as InternalCourseItem).coming_soon }]" 
          :alt="item.title" 
        />
        <div v-if="isInternal && (item as InternalCourseItem).coming_soon" class="absolute top-[40%] left-0 w-full transform -translate-y-1/2 text-white text-center py-2 font-bold uppercase text-2xl shadow-md bg-black bg-opacity-85" style="transform: rotate(-5deg);">
          Coming Soon
        </div>
      </component>
    </div>
    <div>
      <div v-if="isExternal">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
        </a>
      </div>
      <div v-else>
        <NuxtLink
          :to="'/course/' + (item as InternalCourseItem).slug"
          class="animatedIcon prettyLink animatedIcon mt-7 inline-block font-bold cursor-pointer"
        >
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
        </NuxtLink>
      </div>
      <div class="mt-7">
        {{ item.description }}
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseItem, ExternalCourseItem, InternalCourseItem } from '~/types/courses';

const props = defineProps<{
  item: CourseItem,
  colorIndex: number
}>()

const isExternal = computed(() => 'external' in props.item)
const isInternal = computed(() => !isExternal.value)

const getInternalLink = (item: InternalCourseItem) => {
  return item.comingSoon ? '#' : '/course/' + item.slug
}

const blockClass = computed(() => useColorCycle(props.colorIndex))
</script>
