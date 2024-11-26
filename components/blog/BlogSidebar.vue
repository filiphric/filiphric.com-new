<template>
  <div class="col-span-2 hidden lg:block">
    <div v-if="links.length">
      <h2 class="text-2xl font-bold">
        Table of contents:
      </h2>
      <ul>
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="'#' + link.id"
          class="prettyLink block max-w-fit"
        >
          {{ link.text }}
        </NuxtLink>
      </ul>
    </div>
    <!-- <BlogFeaturedCourse /> -->
    <BlogLatestBlogPost :post="latestBlogPost" />
    <BlogUpcomingWorkshops :workshops="upcomingWorkshop" />
  </div>
</template>

<script setup lang="ts">
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'
import { BlogPost } from '~/types/blog';
import { Workshop } from '~/types/workshop';

defineProps<{ links: Array<{
  id: string,
  text: string
}> }>()

const { data: workshopsData } = await useAsyncData('workshops', () => 
  queryContent<Workshop>('/workshops').findOne()
)

const { data: blogData } = await useAsyncData('latestBlog', () => 
  queryContent<BlogPost>('/').where({ published: true }).sort({ date: -1 }).find()
)

const route = useRoute()
const currentSlug = route.params.slug[0]

const upcomingWorkshop = computed(() => {
  const result = workshopsData.value?.body.filter((item: any) => isGreaterThanToday(item.startDate))
  return result || []
})

const latestBlogPost = computed(() => {
  if (blogData.value?.[0].slug === currentSlug) return blogData.value?.[1]
  return blogData.value?.[0] || null
})
</script>
