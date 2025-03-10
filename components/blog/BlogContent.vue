<template>
  <div class="mt-7">
    <BlogHeading
      :cypress-version="doc.cypressVersion"
      :playwright-version="doc.playwrightVersion"
      :vitest-version="doc.vitestVersion"
      :webdriverio-version="doc.webdriverioVersion"
      :date="doc.date"
      :title="doc.title"
      :image="doc.image"
      :reading-time="doc.readingTime.text"
    />
    <div class="grid max-w-2xl grid-cols-1 gap-14 lg:max-w-none lg:grid-cols-7">
      <div class="col-span-5">
        <ContentRenderer :value="doc" class=" text-base font-light md:text-lg" data-cy="blog-content" />
        <BlogShareLinks :blog-info="doc" />
      </div>
      <BlogSidebar :links="doc.body.toc.links">
        <BlogFeaturedCourse />
        <BlogUpcomingWorkshops  />
        <BlogLatestBlogPost  />
      </BlogSidebar>
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
    playwrightVersion: string,
    vitestVersion: string,
    webdriverioVersion: string,
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
    title: props.doc.title,
    meta: [
      {
        name: 'image',
        content: `https://og.filiphric.com/api/og?image=${props.doc.image}&title=${props.doc.title}&readingTime=${props.doc.readingTime.text}`
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
        content: `https://og.filiphric.com/api/og?image=${props.doc.image}&title=${props.doc.title}&readingTime=${props.doc.readingTime.text}`
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
        content: `https://og.filiphric.com/api/og?image=${props.doc.image}&title=${props.doc.title}&readingTime=${props.doc.readingTime.text}`
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
