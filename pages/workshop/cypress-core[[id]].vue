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
  const result = data.value.body.filter((item: any) => item.type === 'core_workshop')[0]
  return result
})

</script>
