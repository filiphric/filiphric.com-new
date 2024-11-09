<template>
  <div>
    <div id="course-payment" class="mt-1 place-self-center">
      <ActionButton @click="pay(); useTrackEvent('PayButton - ' + info?.title)" class="w-80 h-14 uppercase flex items-center justify-center cursor-pointer">
        Purchase course
      </ActionButton>
      <span class="mt-2 block text-left text-sm text-gray-500">
        After clicking the button, you will be redirected<br /> to <IconStripe class="inline-block h-4 pb-0.5 -mx-1" /> checkout page
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.stripeApiKey)

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  priceId: {
    type: String,
    required: true
  }
})

const pay = () => {
  useFetch('/api/checkout', {
    method: 'POST',
    body: {
      order: {
        quantity: 1,
        price: props.priceId
      },
      metadata: {
        item: props.info.title,
        type: 'course',
        redirectPath: '/course/payment-confirmation'
      }
    }
  }).then(({ data }) => {
    // @ts-ignore
    stripe?.redirectToCheckout({ sessionId: data?.value?.id })
  })
}
</script>