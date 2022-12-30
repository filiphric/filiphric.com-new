<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="code-block" :class="color">
    <div class="flex h-10 justify-between rounded-t-2xl bg-white px-6 py-1.5 font-mono text-black dark:bg-black-light dark:text-gray-100">
      <div class="grid grid-cols-3 items-center gap-2">
        <!-- three dots -->
        <span class="h-3 w-3 rounded-full border border-punch-dark bg-punch" />
        <span class="h-3 w-3 rounded-full border border-cheese-dark bg-cheese" />
        <span class="h-3 w-3 rounded-full border border-lime-dark bg-lime" />
      </div>
      <div>
        {{ filename }}
      </div>
      <div class="copyToolbar grid cursor-pointer items-center font-normal" @click="copy()">
        <div v-if="!copied">
          <div class="copyLabel inline opacity-0 transition-all duration-100">
            Copy to clipboard
          </div>
          <IconCopy class="hidden h-4 w-4 md:inline" />
        </div>
        <div v-else>
          Copied! 🎉
        </div>
      </div>
    </div>
    <pre :class="'language-' + language" v-html="transformedCode" />
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
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

const source = ref(props.code)
const { copy, copied } = useClipboard({ source })

const transformedCode = transform(props.code, props.language, props.highlights)
const color = `shadow-block-${randomColor()} dark:shadow-block-dark-${randomColor()}`

</script>

<style>
/* all code block styles */
@import '~/assets/css/prism.css';
.code-block {
  @apply mt-10 mb-14 mr-2 rounded-2xl font-mono font-semibold text-sm md:text-base max-w-2xl;
}
.copyToolbar:hover .copyLabel {
  opacity: 100%
}

</style>
