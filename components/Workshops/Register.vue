<template>
  <button @click="pay">
    Register for {{ info?.title }}
  </button>
  <span>You will be redirected to Stripe checkout page</span>
</template>
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.stripeApiKey)

const props = defineProps({
  info: {
    type: Object,
    default: undefined
  }
})

const pay = () => {
  useFetch('/api/checkout', {
    method: 'POST',
    body: {
      order: {
        quantity: 1,
        price: props.info?.priceId
      },
      metadata: {
        date: props.info?.date,
        item: props.info?.title,
        redirectPath: `/workshop/${props.info?.slug}`
      }
    }
  }).then(({ data }) => {
    // @ts-ignore
    stripe?.redirectToCheckout({ sessionId: data?.value?.id })
  })
}

</script>
