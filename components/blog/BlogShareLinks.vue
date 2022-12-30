<template>
  <div>
    <a :href="`https://twitter.com/intent/tweet?url=${tweetText}`">Share on social networks</a>

    <hr class="mb-14 mt-3 w-full border-gray-400 ">
  </div>
</template>
<script setup lang="ts">

const route = useRoute()
const tweetText = route

// const tweetText = ${doc.slug}&text=${encodeURI(`Hey! I just read \"${doc.title}\" by @filip_hric`)}
</script>
