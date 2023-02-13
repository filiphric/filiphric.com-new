<template>
  <NuxtLayout>
    <CypressCoreHeader
      :description="workshopInfo.description"
      :days="workshopInfo.days"
      :date="workshopInfo.date"
      :time="workshopInfo.time"
    />
    <CypressCoreEndorsment />
    <CypressCoreOnTheRise />
    <CypressCoreImportance />
    <CypressCoreForm />
    <CypressCoreAbout />
    <CypressCoreContent />
    <CypressCoreRegistration :workshop-info="workshopInfo" />
    <CypressCoreFaq />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'

const { data } = await useAsyncData('workshops', () => queryContent<MaybeComputedRef<any>>('/workshops').findOne())

const workshopInfo = computed(() => {
  const result = data.value.body.filter((item: any) => item.type === 'core-workshop')[0]
  return result
})

const route = useRoute()

useHead({
  meta: [
    {
      name: 'image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${workshopInfo.value.image}&title=${encodeURIComponent(workshopInfo.value.title)}&description=${encodeURIComponent(workshopInfo.value.description)}&date=${encodeURIComponent(workshopInfo.value.date)}&days=${encodeURIComponent(workshopInfo.value.days)}`
    },
    {
      property: 'og:url',
      content: `https://filiphric.com${route.path}`
    },
    {
      property: 'og:image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${workshopInfo.value.image}&title=${encodeURIComponent(workshopInfo.value.title)}&description=${encodeURIComponent(workshopInfo.value.description)}&date=${encodeURIComponent(workshopInfo.value.date)}&days=${encodeURIComponent(workshopInfo.value.days)}`
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
      property: 'twitter:image',
      content: `https://filiphric-com-og.vercel.app/api/og?image=${workshopInfo.value.image}&title=${encodeURIComponent(workshopInfo.value.title)}&description=${encodeURIComponent(workshopInfo.value.description)}&date=${encodeURIComponent(workshopInfo.value.date)}&days=${encodeURIComponent(workshopInfo.value.days)}`
    },
    {
      property: 'article:published_time',
      content: workshopInfo.value.date
    },
    {
      property: 'article:author',
      content: 'Filip Hric'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://filiphric.com${route.path}`
    }
  ]
})

</script>
