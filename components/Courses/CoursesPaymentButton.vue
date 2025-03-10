<template>
  <div>
    <form :action="checkoutUrl" method="POST" @submit.prevent="handleSubmit">
      <div id="course-payment" class="mt-1 place-self-center">
       
        <button type="submit">
          <ActionButton 
            :disabled="!props.info?.id"
            class="h-14 text-lg text-center text-nowrap"
          >
          Purchase course for {{ 99 - (props.discount * 100) }} €
          </ActionButton>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '~/types/supabase'

const store = useStore()
const user = computed(() => store.user as Profile | null)
const checkoutUrl = '/api/course-checkout'

const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  priceId: {
    type: String,
    required: true
  },
  couponId: {
    type: String,
    required: false
  },
  discount: {
    type: Number,
    required: false,
    default: 0
  }
})

const handleSubmit = async (event: Event) => {
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
      },
      discounts: [
        {
          coupon: props.couponId
        }
      ],
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

  // Submit checkout data
  const { data } = await useFetch(checkoutUrl, {
    method: 'POST',
    body: {
      order: {
        quantity: 1,
        price: props.priceId,
      },
      discounts: [
        {
          coupon: props.couponId
        }
      ],
      customer_id: user.value?.stripe_customer,
      redirectPath: '/course/payment-confirmation',
      metadata: {
        item: props.info.title,
        type: 'course',
        courseId: props.info.id
      }
    }
  })

  // Redirect to Stripe Checkout
  if (data.value?.url) {
    window.location.href = data.value.url
  }
}
</script>