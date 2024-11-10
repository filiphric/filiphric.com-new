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
          :src="item.image" 
          :class="['mb-7', { 'filter blur-md': isInternal && (item as InternalCourseItem).comingSoon }]" 
          :alt="item.title" 
        />
        <div v-if="isInternal && (item as InternalCourseItem).comingSoon" class="absolute top-[40%] left-0 w-full transform -translate-y-1/2 text-white text-center py-2 font-bold uppercase text-2xl shadow-md bg-black bg-opacity-85" style="transform: rotate(-5deg);">
          Coming Soon
        </div>
      </component>
    </div>
    <div>
      <component :is="isExternal ? 'a' : 'NuxtLink'"
        :href="isExternal ? (item as ExternalCourseItem).url : undefined"
        :to="!isExternal ? getInternalLink(item as InternalCourseItem) : undefined"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener' : undefined"
      >
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
      </component>
      <div class="mt-7">
        {{ item.description }}
      </div>
      <component v-if="!isExternal && !(item as InternalCourseItem).comingSoon"
        :is="isExternal ? 'a' : 'NuxtLink'"
        :href="isExternal ? (item as ExternalCourseItem).url : undefined"
        :to="!isExternal ? '/course/' + (item as InternalCourseItem).slug : undefined"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener' : undefined"
        class="animatedIcon prettyLink animatedIcon mt-7 inline-block font-bold"
      >
        Learn more <IconArrowForward class="inline transition-all ease-in-out" />
      </component>
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
