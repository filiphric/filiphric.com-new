<template>
  <div>
    <div v-if="query.length" class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="{ item } in results" :key="item.slug">
        <BlogItem
          :item="item"
        />
      </div>
    </div>
    <div v-else class="grid grid-cols-1 place-items-center gap-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in data" :key="item.slug">
        <BlogItem
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'

const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

const { data } = await useAsyncData(() => queryContent<MaybeComputedRef<any>>('/').where({ visible: true }).only(['title', 'description', 'slug', 'image', 'readingTime', 'date']).sort({ date: -1 }).find())

const searchQuery = toRefs(props)

// @ts-ignore
const { results } = useFuse(searchQuery.query, data, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ['title', 'description']
  }
})
</script>
