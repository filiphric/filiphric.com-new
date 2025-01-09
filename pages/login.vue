<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto mt-14 p-7">
      <h1 class="text-4xl font-bold mb-7 text-center">Sign in with GitHub</h1>
      
      <div class="space-y-4">
        <ActionButton class="w-full bg-white text-xl disabled:opacity-50" @click="signInWithGithub" :disabled="loading">
          <div class="flex items-center justify-center gap-3">
            <IconGithub class="w-6 h-6" />
            {{ loading ? 'Connecting...' : 'Continue with GitHub' }}
          </div>
        </ActionButton>
      </div>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import type { Profile } from '~/types/supabase'

const { signInWithProvider } = useSupabaseAuth()
const error = ref('')
const loading = ref(false)
const route = useRoute()
const stripe = await loadStripe(useRuntimeConfig().public.stripeApiKey)

// Store redirect URL if present in query params
if (route.query.redirectTo) {
  const redirect = useCookie('authRedirect')
  redirect.value = route.query.redirectTo as string
}

// Watch for successful login
watch(() => useSupabaseUser().value, async (newUser) => {
  if (newUser) {
    const paymentIntent = useCookie('paymentIntent').value
    
    if (paymentIntent) {
      // Clear the stored payment intent
      useCookie('paymentIntent').value = null
      
      const { priceId, courseInfo } = JSON.parse(paymentIntent)
      
      // Proceed with payment
      const { data } = await useFetch('/api/course-checkout', {
        method: 'POST',
        body: {
          order: {
            quantity: 1,
            price: priceId,
          },
          client_reference_id: (newUser as unknown as Profile)?.stripe_customer,
          redirectPath: '/course/payment-confirmation',
          customer_email: newUser.email,
          metadata: {
            item: courseInfo.title,
            type: 'course',
            courseId: courseInfo.id
          }
        }
      })
      
      // @ts-ignore
      await stripe?.redirectToCheckout({ sessionId: data?.value?.id })
    }
  }
})

const signInWithGithub = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { error: err } = await signInWithProvider('github')
    
    if (err) throw err
  } catch (err: any) {
    error.value = err?.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>