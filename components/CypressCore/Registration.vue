<template>
  <div class="mt-14">
    <h2 class=" mb-14 text-center text-5xl font-extrabold lg:text-6xl">
      Get ready to up your Cypress game
    </h2>
    <CypressCorePrice :price="price" :discount="discount" :discount-applied="discountApplied" @apply-discount="applyDiscount()" @remove-discount="removeDiscount()" />
    <div class="grid grid-cols-1 gap-7 md:grid-cols-2">
      <CypressCoreSignupProcess />
      <WorkshopsRegisterForm :info="workshopInfo" :price="price" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  workshopInfo: {
    type: Object,
    default: undefined
  }
})

const price = ref()
const discount = ref()
const discountApplied = ref(false)

const removeDiscount = async () => {
  price.value = await getPrice(props?.workshopInfo?.priceId)
  discountApplied.value = false
}

const applyDiscount = async () => {
  price.value = await getPrice(discount.value.data?.priceId)
  discountApplied.value = true
}

const getPrice = async (priceId: string) => {
  const result = await useFetch(`/api/price/${priceId}`, { server: false, pick: ['unit_amount', 'id'] as never[] })
  return result
}

price.value = await getPrice(props?.workshopInfo?.priceId)
discount.value = await useFetch('/api/location', { server: false, pick: ['country', 'amount', 'eligible', 'priceId'] as never [] })

</script>
