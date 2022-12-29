<template>
  <input
    :value="query"
    class="h-4 w-96 rounded-full bg-transparent p-7 text-lg text-gray-400 outline-none dark:border dark:border-gray-400 md:mt-8 md:h-8"
    :class="styleClasses"
    placeholder="Search articles"
    @input="updateValue"
  >
</template>
<script setup lang="ts">

import { randomColor } from '@/helpers/randomColor'

defineProps({
  query: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:query'])

const updateValue = (e: Event) => {
  emit('update:query', (e.target as HTMLInputElement).value)
}

const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} hover:shadow-block-hover-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:hover:shadow-block-dark-hover-${randomizedColor} transition ease-in-out hover:-translate-y-1 hover:-translate-x-1 dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0`

</script>
