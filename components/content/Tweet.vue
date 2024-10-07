<template>
  <div class="tweet-wrapper">
    <div ref="tweetContainer"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const tweetContainer = ref(null)
const colorMode = useColorMode()

onMounted(() => {
  loadTwitterScript()
})

watch(colorMode, () => {
  renderTweet()
})

function loadTwitterScript() {
  if (!window.twttr) {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    script.onload = renderTweet
    document.head.appendChild(script)
  } else {
    renderTweet()
  }
}

function renderTweet() {
  if (window.twttr && tweetContainer.value) {
    // @ts-ignore
    tweetContainer.value.innerHTML = ''
    window.twttr.widgets.createTweet(props.id, tweetContainer.value, {
      theme: colorMode.value === 'dark' ? 'dark' : 'light'
    })
  }
}
</script>

<style scoped>
.tweet-wrapper {
  margin: 1em 0;
}
</style>