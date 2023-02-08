<template>
  <NuxtLayout>
    <ContentBlock image="/core_workshop_2_q9fzxv.png" alt="Cypress core workshop">
      <template #heading>
        Cypress core workshop
      </template>
      <template v-if="!workshopInfo" #description>
        Next date will be announced soon. Subscribe to newsletter if you want to be notified.
      </template>
      <template v-else #description>
        {{ workshopInfo.description }}
      </template>
    </ContentBlock>
    <div v-if="workshopInfo">
      <WorkshopsRegister :info="workshopInfo" />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'

const { data } = await useAsyncData('workshops', () => queryContent<MaybeComputedRef<any>>('/workshops').findOne())

const workshopInfo = computed(() => {
  const result = data.value.body.filter((item: any) => item.type === 'core_workshop')[0]
  return result
})

</script>
