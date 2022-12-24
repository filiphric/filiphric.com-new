<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="code-block" :class="color">
    <div class="flex h-10 justify-between rounded-t-2xl bg-white px-6 py-1.5 font-mono text-black dark:bg-black-light dark:text-gray-100">
      <div class="grid grid-cols-3 items-center gap-2">
        <!-- three dots -->
        <span class="h-3 w-3 rounded-full border border-punch-dark bg-punch" />
        <span class="h-3 w-3 rounded-full border border-cheese-dark bg-cheese" />
        <span class="h-3 w-3 rounded-full bg-lime" />
      </div>
      <div>
        {{ filename }}
      </div>
      <div class="grid items-center">
        <Copy class="h-4 w-4" />
      </div>
    </div>
    <pre :class="'language-' + language" v-html="transformedCode" />
  </div>
</template>

<script setup lang="ts">
import Copy from './icons/PhCopy.vue'
import { transform } from '@/helpers/transform'
import { randomColor } from '@/helpers/randomColor'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'json'
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  }
})

const transformedCode = transform(props.code, props.language, props.highlights)
const color = `shadow-code-${randomColor()} dark:shadow-code-dark-${randomColor()}`

</script>

<style>
/* all code block styles */
@import '~/assets/css/prism.css';
.code-block {
  @apply m-8 rounded-2xl max-w-3xl font-mono font-semibold;
}
</style>
