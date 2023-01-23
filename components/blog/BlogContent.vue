<template>
  <div class="mt-7">
    <BlogHeading
      :cypress-version="doc.cypressVersion"
      :date="doc.date"
      :title="doc.title"
      :image="doc.image"
      :reading-time="doc.readingTime.text"
    />
    <div class="grid max-w-2xl grid-cols-1 gap-14 lg:max-w-none lg:grid-cols-7">
      <div class="col-span-5">
        <ContentRenderer :value="doc" class=" text-base font-light md:text-lg" />
        <BlogShareLinks :blog-info="doc" />
      </div>
      <div class="col-span-2 mt-5 hidden lg:block">
        <h2 class="text-2xl font-bold">
          Table of contents:
        </h2>
        <ul>
          <NuxtLink
            v-for="link in doc.body.toc.links"
            :key="link.id"
            :to="'#' + link.id"
            class="prettyLink inline-block"
          >
            {{ link.text }}
          </NuxtLink>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type Link = {
  id: string,
  text: string
}
const props = defineProps<{
  doc: {
    title: string,
    cypressVersion: string,
    image: string,
    slug: string,
    date: string,
    readingTime: {
      text: string
    },
    body: {
      toc: {
        links: Link[]
      }
    },
    description: string
  }
}>()

if (props.doc) {
  useHead({
    title: props.doc.title || 'Filip Hric',
    meta: [{
      hid: 'description',
      name: 'description',
      content: props.doc.description
    },
    {
      name: 'image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${encodeURIComponent(props.doc.image)}&title=${encodeURIComponent(props.doc.title)}&readingTime=${encodeURIComponent(props.doc.readingTime.text)}`
    },
    {
      property: 'og:url',
      content: `https://filiphric.com/${props.doc.slug}`
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:title',
      content: props.doc.title
    },
    {
      property: 'og:description',
      content: props.doc.description
    },
    {
      property: 'og:image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${encodeURIComponent(props.doc.image)}&title=${encodeURIComponent(props.doc.title)}&readingTime=${encodeURIComponent(props.doc.readingTime.text)}`
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:creator',
      content: '@filip_hric'
    },
    {
      property: 'twitter:title',
      content: props.doc.title
    },
    {
      property: 'twitter:description',
      content: props.doc.description
    },
    {
      property: 'twitter:image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${encodeURIComponent(props.doc.image)}&title=${encodeURIComponent(props.doc.title)}&readingTime=${encodeURIComponent(props.doc.readingTime.text)}`
    },
    {
      property: 'article:published_time',
      content: props.doc.date
    },
    {
      property: 'article:author',
      content: 'Filip Hric'
    }
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://filiphric.com/${props.doc.slug}`
      }
    ]
  })
}
</script>
