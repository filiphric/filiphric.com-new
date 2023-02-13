<template>
  <div class="w-full px-4">
    <div>
      <div class="mb-3  text-xl font-extrabold">
        Please fill in the attendee info:
      </div>
      <label for="attendeeFirstName" class="block">First name</label>
      <input
        v-model="attendeeFirstName"
        type="text"
        name="attendeeFirstName"
        class="mt-1 h-10 w-full rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
      <label for="attendeeLastName" class="mt-4 block">Last name</label>
      <input
        v-model="attendeeLastName"
        type="text"
        name="attendeeLastName"
        class="mt-1 h-10 w-full rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
      <label for="attendeeEmail" class="mt-4 block">Email</label>
      <input
        v-model="attendeeEmail"
        class="mt-1 h-10 w-full rounded-xl bg-white px-5 text-lg shadow-block-tangerine outline-none transition-all dark:rounded-md dark:bg-black-dark dark:shadow-block-none dark:focus:bg-black-lighter"
      >
    </div>
    <div>
      <p
        class="mt-5 text-sm text-punch"
        :class="errors.length ? 'opacity-100' : 'opacity-0'"
      >
        {{ errorMessage }}
      </p>
    </div>
    <div id="registration" class="mt-1">
      <button class="mt-5 w-full rounded-lg bg-white px-7 py-3 text-xl font-black uppercase shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:shadow-block-dark-lime dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-lime" @click="pay">
        Save your spot in upcoming {{ info?.title }}
      </button>
      <span class="mt-5 block text-center text-sm text-gray-500">You will be redirected to <IconStripe class="inline-block h-5 pb-0.5" /> checkout page</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import { Ref } from 'vue'
const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.stripeApiKey)

const attendeeFirstName = ref()
const attendeeLastName = ref()
const attendeeEmail = ref()
const errorMessage = ref()

const errors: Ref<string[]> = ref([])
const errorAttendeeFirstName = ref(false)
const errorAttendeeLastName = ref(false)
const errorAttendeeEmail = ref(false)

const props = defineProps({
  info: {
    type: Object,
    default: undefined
  }
})

function requiredFields (errors: string[]) {
  let message = ''
  switch (errors.length) {
    case 1:
      message = `${errors[0]} is required`
      break
    case 2:
      message = `${errors[0]} and ${errors[1]} are required`
      break
    default:
      // eslint-disable-next-line no-case-declarations
      const lastItem = errors.pop()
      message = `${errors.join(', ')} and ${lastItem} are required`
      break
  }
  return message.charAt(0).toUpperCase() + message.slice(1)
}

const pay = () => {
  if (attendeeFirstName.value && attendeeLastName.value && attendeeEmail.value) {
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
          type: props.info?.type,
          attendeeFirstName: attendeeFirstName.value,
          attendeeLastName: attendeeLastName.value,
          attendeeEmail: attendeeEmail.value,
          redirectPath: '/workshop/registration'
        }
      }
    }).then(({ data }) => {
    // @ts-ignore
      stripe?.redirectToCheckout({ sessionId: data?.value?.id })
    })
  } else {
    errors.value = []

    if (!attendeeFirstName.value) {
      errorAttendeeFirstName.value = true
      errors.value.push('first name')
    }
    if (!attendeeLastName.value) {
      errorAttendeeLastName.value = true
      errors.value.push('last name')
    }
    if (!attendeeEmail.value) {
      errorAttendeeEmail.value = true
      errors.value.push('email')
    }

    errorMessage.value = requiredFields(errors.value)
  }
}

</script>
