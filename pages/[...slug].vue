<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
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
              Upcoming workshops
            </h2>
          </div>
        </div>
      </div>
    </ContentDoc>
  </NuxtLayout>
</template>
<script setup lang="ts">
const { page } = useContent()

useHead({
  title: page.value.title,
  meta: [{
    hid: 'description',
    name: 'description',
    content: page.value.description
  },
  {
    name: 'image',
    content: `https://filiphric-com-og.vercel.app/api/og?${encodeURIComponent(page.value.image)}&title=${encodeURIComponent(page.value.title)}&readingTime=${encodeURIComponent(page.value.readingTime.text)}`
  },
  {
    property: 'og:url',
    content: `https://filiphric.com/${page.value.slug}`
  },
  {
    property: 'og:type',
    content: 'article'
  },
  {
    property: 'og:title',
    content: page.value.title
  },
  {
    property: 'og:description',
    content: page.value.description
  },
  {
    property: 'og:image',
    content: `https://filiphric-com-og.vercel.app/api/og?${encodeURIComponent(page.value.image)}&title=${encodeURIComponent(page.value.title)}&readingTime=${encodeURIComponent(page.value.readingTime.text)}`
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
    content: page.value.title
  },
  {
    property: 'twitter:description',
    content: page.value.description
  },
  {
    property: 'twitter:image',
    content: `https://filiphric-com-og.vercel.app/api/og?${encodeURIComponent(page.value.image)}&title=${encodeURIComponent(page.value.title)}&readingTime=${encodeURIComponent(page.value.readingTime.text)}`
  },
  {
    property: 'article:published_time',
    content: page.value.date
  },
  {
    property: 'article:author',
    content: 'Filip Hric'
  }
  ]
})
</script>
