<template>
  <NuxtLayout>
    <ContentBlock image="/cypress_tips_no_text_f36hyj.png" alt="99 Cypress Tips">
      <template #heading class="text-left">99 Cypress Tips</template>
      <template #description>
        Bite-sized tips to help you become a Cypress master. 
      </template>
      <template #paragraph>
        From mastering configuration and API testing, through advanced networking and DOM manipulation, to enhancing performance and debugging and more.
        <CoursesPaymentButton :info="courseInfo" :price-id="courseInfo.priceId" />
      </template>
    </ContentBlock>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'

const { data } = await useAsyncData('courses', () => queryContent<MaybeRefOrGetter<any>>('/courses').findOne())

const courseInfo = computed(() => {
  if (data.value && data.value.body) {
    return data.value.body.find((course: any) => course.slug === '99-cypress-tips')
  }
  return null
})
</script>
