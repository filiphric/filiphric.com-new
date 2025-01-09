<template>
  <div>
    <div id="course-payment" class="mt-1 place-self-center">
      <ActionButton @click="pay()" class="h-14 w-64 text-lg text-center">
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
  if (!user.value) {
    // Store payment intent in cookie
    const paymentCookie = useCookie('paymentIntent', {
      maxAge: 3600,
      sameSite: true
    })
    paymentCookie.value = JSON.stringify({
      priceId: props.priceId,
      courseInfo: {
        title: props.info.title,
        id: props.info.id
      }
    })
    
    // Redirect to login
    const returnUrl = window.location.pathname
    const authRedirectCookie = useCookie('authRedirect', {
      maxAge: 3600,
      sameSite: true
    })
    authRedirectCookie.value = returnUrl
    navigateTo('/login')
    return
  }

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