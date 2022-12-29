<template>
  <div>
    <BlogHeader>
      <input v-model="query" class="mt-8 h-16 w-96 rounded-full border border-gray-400 bg-transparent p-7 text-gray-400 outline-none" placeholder="Search articles">
    </BlogHeader>
    <div v-if="query.length">
      <div v-for="{ item } in results" :key="item.slug">
        <BlogItem
          :item="item"
        />
      </div>
    </div>
    <div v-else>
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

const query = ref('')

const { data } = useAsyncData('home', () => queryContent<MaybeComputedRef<any>>('/').where({ published: true }).sort({ date: -1 }).find())

// @ts-ignore
const results = useFuse(query, data, {
  matchAllWhenSearchEmpty: true,
  fuseOptions: {
    keys: ['title']
  }
}).results

</script>
