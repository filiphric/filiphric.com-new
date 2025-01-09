<script setup lang="ts">
import type { Profile } from '~/types/supabase'
import { loadStripe } from '@stripe/stripe-js'

const client = useSupabaseClient()
const router = useRouter()
const store = useStore()
const stripe = await loadStripe(useRuntimeConfig().public.stripeApiKey)
const error = ref('')

onMounted(async () => {
  try {
    const { search, hash } = window.location
    
    // Check for hash parameters (GitHub might return params in hash)
    const params = new URLSearchParams(search || hash.slice(1))
    if (!params.has('code')) {
      router.push('/login')
      return
    }

    const { data: { user }, error: userError } = await client.auth.getUser()
    if (userError) throw userError

    if (user) {
      // Fetch profile data including stripe_customer
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single() as { data: Profile | null, error: any }

      if (profileError) throw profileError

      const userData: Profile = {
        id: user.id,
        email: user.email as string,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        created_at: user.created_at,
        updated_at: user.last_sign_in_at || user.created_at,
        stripe_customer: profile?.stripe_customer || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        full_name: user.user_metadata?.full_name || null
      }
      
      store.$patch((state) => {
        state.user = userData
      })
      
      // Check for payment intent before redirect
      const paymentCookie = useCookie('paymentIntent', {
        maxAge: 3600,
        sameSite: true
      })
      const paymentIntent = paymentCookie.value
      
      if (paymentIntent) {
        try {
          // Clear the stored payment intent
          paymentCookie.value = null
          
          // Handle the proxy object by converting it to a plain object first
          const paymentData = typeof paymentIntent === 'string' 
            ? JSON.parse(paymentIntent)
            : paymentIntent
            
          const { priceId, courseInfo } = paymentData
          
          // Proceed with payment
          const { data: checkoutData } = await useFetch('/api/course-checkout', {
            method: 'POST',
            body: {
              order: {
                quantity: 1,
                price: priceId,
              },
              client_reference_id: userData.stripe_customer,
              redirectPath: '/course/payment-confirmation',
              customer_email: userData.email,
              metadata: {
                item: courseInfo.title,
                type: 'course',
                courseId: courseInfo.id
              }
            }
          })
                    
          // Clear auth redirect as we're handling redirect manually
          useCookie('authRedirect').value = null
          
          // Redirect to Stripe
          if (checkoutData.value?.id) {
            await stripe?.redirectToCheckout({ sessionId: checkoutData.value.id })
          } else {
            throw new Error('No session ID returned from checkout')
          }
        } catch (e) {
          console.error('Payment flow error:', e)
          error.value = 'Error processing payment. Please try again.'
        }
      } else {
        router.push('/profile')
      }
    } else {
      store.$patch((state) => {
        state.user = null
      })
      router.push('/login')
    }
  } catch (e) {
    console.error('Callback error:', e)
    error.value = 'Error during login. Please try again.'
    router.push('/login')
  }
})
</script>

<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex items-center justify-center">
      <div class="text-center">
        <div v-if="error" class="text-red-500 mb-4">
          {{ error }}
        </div>
        <div v-else>
          <div class="mb-4">
            <LoaderAnimation />
          </div>
          <p class="text-xl">Completing login...</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template> 