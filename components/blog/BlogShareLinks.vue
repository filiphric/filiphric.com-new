<template>
  <div class="mt-14">
    <a class="prettyLink mr-7 pb-2" :href="`https://twitter.com/intent/tweet?url=${tweetText}`">
      <IconTwitter class="mr-2 inline w-5 fill-white" /><p class="inline text-left">
        Tweet this article
      </p>
    </a>
    <a class="prettyLink mr-7 pb-2" :href="`https://www.linkedin.com/sharing/share-offsite/?url=${props.blogInfo?.slug}`">
      <IconLinkedin class="mr-2 inline w-5 fill-white" /><p class="inline text-left">
        Share on LinkedIn
      </p>
    </a>
    <a class="prettyLink pb-2" :href="githubLink">
      <IconGithub class="mr-2 inline w-5 fill-white" /><p class="inline text-left">
        Edit on GitHub
      </p>
    </a>
    <hr class="mt-5 w-full border-gray-400 ">
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  blogInfo: {
    type: Object,
    default: undefined
  }
})

const githubLink = `https://github.com/filiphric/filiphric.com-new/blob/main/content/${props.blogInfo?._file}`

const tweetText = `https://filiphric.com/${props.blogInfo?.slug}&text=${`Hey I just read "${props.blogInfo?.title}`}" by @filip_hric`

</script>
