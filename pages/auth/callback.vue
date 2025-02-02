<script setup lang="ts">
import type { Profile } from '~/types/supabase'

const router = useRouter()
const store = useStore()
const error = ref('')
const { getCurrentUser } = useSupabaseAuth()
const { getProfile } = useSupabaseProfile()
const paymentIntent = useCookie('paymentIntent').value

onMounted(async () => {
  try {
    const { search, hash } = window.location
    
    // Check for hash parameters (GitHub might return params in hash)
    const params = new URLSearchParams(search || hash.slice(1))
    if (!params.has('code')) {
      router.push('/login')
      return
    }

    const { user, error: userError } = await getCurrentUser()
    if (userError) throw userError

    if (user) {
      // Fetch profile data including stripe_customer with retries
      let profile
      let profileError
      let retryCount = 0
      const maxRetries = 3
      const retryDelay = 2000 // 2 seconds

      while (retryCount < maxRetries) {
        const result = await getProfile(user.id)
        profile = result.profile
        profileError = result.error

        if (profileError) throw profileError
        
        // If we have stripe_customer, break the retry loop
        if (profile?.stripe_customer) {
          break
        }

        // Wait before next retry
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        retryCount++
      }

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
      const paymentCookie = useCookie('paymentIntent')
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
          const { data } = await useFetch('/api/course-checkout', {
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
          if (data.value?.url) {
            window.location.href = data.value.url
          } else {
            throw new Error('No checkout URL returned')
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
          <p class="text-xl">{{ paymentIntent ? 'Redirecting to checkout...' : 'Completing login...' }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template> 