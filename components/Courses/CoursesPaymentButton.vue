<template>
  <div>
    <div id="course-payment" class="mt-1 place-self-center">
      <ActionButton @click="pay(); useTrackEvent('PayButton - ' + info?.title)" class="h-14 w-64 text-lg text-center">
        Purchase course
      </ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import type { Profile } from '~/types/supabase'

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

const store = useStore()
const user = computed(() => store.user as Profile | null)

const pay = () => {
  useFetch('/api/course-checkout', {
    method: 'POST',
    body: {
      order: {
        quantity: 1,
        price: props.priceId,
      },
      client_reference_id: user.value?.stripe_customer,
      redirectPath: '/course/payment-confirmation',
      customer_email: user.value?.email,
      metadata: {
        item: props.info.title,
          type: 'course',
          courseId: props.info.id
        }
    }
  }).then(({ data }) => {
    // @ts-ignore
    stripe?.redirectToCheckout({ sessionId: data?.value?.id })
  })
}
</script>