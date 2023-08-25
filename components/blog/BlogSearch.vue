<template>
  <input
    :value="query"
    class="mt-4 h-4 w-96 rounded-full bg-white p-7 text-lg text-gray-400 outline-none dark:border-none dark:bg-transparent md:mt-8 md:h-8"
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

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor}`

</script>
