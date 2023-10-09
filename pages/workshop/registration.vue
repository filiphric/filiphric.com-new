<template>
  <NuxtLayout>
    <ContentBlock v-if="success === 'true'" :image="workshopInfo.image" alt="workshop signup was successful">
      <template #heading>
        You are now registered!
      </template>
      <template #description>
        Looking forward to meeting you on the {{ workshopInfo.title }}
      </template>
      <template #paragraph>
        Please check your inbox for confirmation email. I’ll send the workshop instructions three days before the start.
      </template>
    </ContentBlock>
    <ContentBlock v-if="success === 'false'" :image="'card_b3crwd.png'" alt="workshop signup was not successful">
      <template #heading>
        Uh-oh, something went wrong
      </template>
      <template #description>
        It seems that payment didn’t come through and registration was unsuccessful.
      </template>
      <template #paragraph>
        Please check your inbox. If you haven’t received an email about the workshop, please reach out to me at filip@filiphric.com
      </template>
    </ContentBlock>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
const workshop = useRouteQuery('workshop')
const success = useRouteQuery('success')

const { data } = await useAsyncData('workshops', () => queryContent<MaybeComputedRef<any>>('/workshops').findOne())

const workshopInfo = computed(() => {
  const result = data.value.body.filter((item: any) => item.type === workshop.value)[0]
  return result
})
</script>
