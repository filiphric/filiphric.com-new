<template>
  <NuxtLayout>
    <BlogHeader>
      <BlogSearch @update:query="updateQuery" />
    </BlogHeader>
    <BlogList :query="query" />
  </NuxtLayout>
</template>
<script setup lang="ts">
const query = ref('')
const updateQuery = (q: string) => {
  query.value = q
}
</script>
