<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="code-block" :class="color" data-cy="code-block">
    <div class="flex h-10 justify-between rounded-t-2xl bg-white px-6 py-1.5 font-mono text-black dark:bg-black-light dark:text-gray-100" data-cy="code-toolbar">
      <div class="grid grow-0 grid-cols-3 items-center gap-2">
        <!-- three dots -->
        <span class="h-3 w-3 rounded-full border border-punch-dark bg-punch" />
        <span class="h-3 w-3 rounded-full border border-cheese-dark bg-cheese" />
        <span class="h-3 w-3 rounded-full border border-lime-dark bg-lime" />
      </div>
      <div class="grow place-self-center pl-4">
        {{ filename }}
      </div>
      <div class="copyToolbar grid cursor-pointer items-center font-normal" @click="copy()">
        <div class="inline-block">
          <Transition name="fade" mode="out-in">
            <div v-if="!copied">
              <div class="copyLabel inline opacity-0 transition-all">
                Copy to clipboard
              </div>
              <IconCopy class="hidden h-4 w-4 md:inline" />
            </div>
            <div v-else>
              Copied! 🎉
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <pre :class="'language-' + language" v-html="transformedCode" />
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import * as Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-gherkin'
import { randomColor } from '@/helpers/randomColor'
import { punctuation } from '@/helpers/punctuation'

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

// transform code - add line numbers and highlights
const transformedCode = ref()
onMounted(() => {
  Prism.languages?.insertBefore('json', 'punctuation', punctuation)
  Prism.languages?.insertBefore('js', 'punctuation', punctuation)
  Prism.languages?.insertBefore('ts', 'punctuation', punctuation)

  const formatted = Prism.highlight(props.code, Prism.languages[props.language], props.language)

  transformedCode.value = formatted.split('\n')
    .map((line, num) => `<span ${props.highlights.includes(num + 1) ? 'class="highlight"' : ''}><span class="line-number">${(num + 1).toString().padStart(2, ' ')}  </span>${line}</span>`)
    .slice(0, -1) // remove last line
    .join('\n')
})

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
