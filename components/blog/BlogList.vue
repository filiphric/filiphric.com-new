<template>
  <div>
    <div v-if="query.length" class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="({ item }, index) in results" :key="item.slug">
        <BlogItem
          :item="item"
          :colorIndex="index"
        />
      </div>
    </div>
    <div v-else class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(item, index) in data" :key="item.slug">
        <BlogItem
          :item="item"
          :colorIndex="index"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'

const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

const { data } = await useAsyncData(() => queryContent<MaybeRefOrGetter<any>>('/').where({ published: true }).sort({ date: -1 }).find())

const searchQuery = toRefs(props)

// @ts-ignore
const { results } = useFuse(searchQuery.query, data, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ['title', 'description']
  }
})
</script>
