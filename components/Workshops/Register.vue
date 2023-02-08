<template>
  <button @click="pay">
    Pay
  </button>
</template>
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
const config = useRuntimeConfig()

const stripe = await loadStripe(config.public.stripeApiKey)

const pay = () => {
  useFetch('/api/checkout', {
    method: 'POST',
    body: {
      order: {
        quantity: 1,
        price: 'price_1Ki1KFBnBECxBVfmYxtw6qd5'
      },
      metadata: {
        date: 'from 16th to 25th January 2023',
        item: 'Cypress core workshop',
        redirectPath: '/cypress-core-workshop-january-2023'
      }
    }
  }).then(({ data }) => {
    stripe?.redirectToCheckout({ sessionId: data.id })
  })
}

</script>
