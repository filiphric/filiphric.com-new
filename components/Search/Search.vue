<template>
  <div v-if="show" class="fixed inset-0 w-full h-full flex bg-ivory/80 dark:bg-black/80 items-center justify-center backdrop-blur-xl z-50">
    <div class="w-full h-full p-4 overflow-y-auto">
      <div class="container mx-auto">
        <div class="text-xs py-2 text-black-lighter dark:text-white opacity-50">Press esc to close</div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search..." 
          class="w-full text-xl outline-0 py-2 bg-transparent border-b dark:border-white border-black-lighter"
          ref="searchInput"
          @keydown.enter="handleEnter"
          @keydown.down.prevent="navigateResults(1)"
          @keydown.up.prevent="navigateResults(-1)"
        >
        <div v-if="searchQuery.length && results" class="mt-8 space-y-4">
          <div 
            v-for="(result, index) in results" 
            :key="result.item.slug" 
            :class="['p-4', { 'dark:bg-white/20 bg-black-lighter/20': index === selectedIndex }]"
          >
            <div @click="handleClick(result.item.slug)" class="cursor-pointer">
              <div class="text-lg" v-html="highlightMatch(result.item.title)"></div>
              <div v-if="result.item.description" class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="highlightMatch(result.item.description)"></div>
              <div v-if="result.item.tags" class="mt-2 text-sm">
                <span v-for="tag in result.item.tags" :key="tag" class="mr-2 text-gray-600 dark:text-gray-400" v-html="highlightMatch('#' + tag)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { useRouter } from '#app'

const emit = defineEmits(['hide'])
const router = useRouter()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)
const results = ref<any[]>([])
const searchData = ref<any[]>([])

// Fetch search data
const { data } = await useAsyncData<any[]>('search-content', () => 
  queryContent('/')
    .where({ published: true })
    .sort({ date: -1 })
    .find()
)

// Initialize Fuse instance
const fuse = ref<Fuse<any> | null>(null)

watch(data, (newData) => {
  if (newData) {
    searchData.value = newData
    fuse.value = new Fuse(newData, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.3,
      includeMatches: true
    })
  }
}, { immediate: true })

// Search when query changes
watch(searchQuery, (query) => {
  if (query && fuse.value) {
    results.value = fuse.value.search(query)
  } else {
    results.value = []
  }
  selectedIndex.value = 0
})

// Handle show/hide
watch(() => props.show, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    selectedIndex.value = 0
    results.value = []
  }
})

const handleEnter = () => {
  if (results.value.length > 0) {
    const selectedResult = results.value[selectedIndex.value].item
    router.push(selectedResult.slug)
    emit('hide')
  }
}

const handleClick = (slug: string) => {
  router.push(slug)
  emit('hide')
}

const navigateResults = (direction: number) => {
  if (results.value.length > 0) {
    selectedIndex.value = (selectedIndex.value + direction + results.value.length) % results.value.length
  }
}

const highlightMatch = (text: string) => {
  if (!searchQuery.value || !text) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-cheese dark:bg-cheese">$1</mark>')
}
</script>

<style scoped>
mark {
  padding: 0 2px;
  border-radius: 2px;
}
</style>
