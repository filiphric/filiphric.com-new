<template>
  <div class="place-self-center">
    <div>
      <div class="mb-3 text-xl font-extrabold">
        Please fill in the attendee info:
      </div>
      <label for="attendeeFirstName" class="block">First name</label>
      <input
        v-model="attendeeFirstName"
        type="text"
        name="attendeeFirstName"
        class="mt-1 h-10 w-96 rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
      <label for="attendeeLastName" class="mt-4 block">Last name</label>
      <input
        v-model="attendeeLastName"
        type="text"
        name="attendeeLastName"
        class="mt-1 h-10 w-96 rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
      <label for="attendeeEmail" class="mt-4 block">Email</label>
      <input
        v-model="attendeeEmail"
        class="mt-1 h-10 w-96 rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
    </div>
    <div id="registration" class="mt-1">
      <button class="mt-5 w-96 rounded-lg bg-white px-7 py-3 text-xl font-black uppercase shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:shadow-block-dark-lime dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-lime" @click="pay">
        Register for {{ info?.title }}
      </button>
      <span class="mt-5 block text-center text-sm text-gray-500">You will be redirected to <IconStripe class="inline-block h-5 pb-0.5" /> checkout page</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.stripeApiKey)

const attendeeFirstName = ref()
const attendeeLastName = ref()
const attendeeEmail = ref()

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
        attendeeFirstName: attendeeFirstName.value,
        attendeeLastName: attendeeLastName.value,
        attendeeEmail: attendeeEmail.value,
        redirectPath: `/workshop/${props.info?.slug}`
      }
    }
  }).then(({ data }) => {
    // @ts-ignore
    stripe?.redirectToCheckout({ sessionId: data?.value?.id })
  })
}

</script>
