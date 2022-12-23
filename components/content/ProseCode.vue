<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="code-block" :class="color">
    <div class="flex h-7 justify-between rounded-t-lg border-b-2 bg-white px-6 py-1.5 font-mono text-black dark:border-raisin dark:bg-black dark:text-white">
      <div class="text-xs">
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
const color = `shadow-small-${randomColor()} dark:shadow-small-${randomColor()}-dark`

</script>

<style>
/* all code block styles */
@import '~/assets/css/prism.css';
.code-block {
  @apply m-8 rounded-lg border-black dark:border-raisin border-2 max-w-3xl font-mono font-thin;
}
</style>
