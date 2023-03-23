<template>
  <div>
    <div v-for="blog in data" :key="blog.slug">
      <li>
        <NuxtLink :to="blog.slug" class="prettyLink font-semibold">
          {{ blog.title.replace('Cypress basics: ', '') }}
        </NuxtLink>
      </li>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data } = await useAsyncData('trelloapp', () => queryContent('/').where({ title: { $contains: 'Cypress basics' } }).only(['title', 'slug', 'date']).sort({ date: -1 }).find())

</script>
