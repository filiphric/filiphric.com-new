<template>
  <div>
    <div id="course-payment" class="mt-1">
      <button 
        class="mt-5 w-full rounded-lg bg-white px-7 py-3 text-xl font-black uppercase shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:shadow-block-dark-lime dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-lime" 
        @click="pay(); useTrackEvent('PayButton - ' + info?.title)"
      >
        Preorder now
      </button>
      <span class="mt-5 block text-center text-sm text-gray-500">
        After clicking the button, you will be redirected to <IconStripe class="inline-block h-4 pb-0.5 -mx-1" /> checkout page
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