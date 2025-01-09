<script setup lang="ts">
import type { Profile } from '~/types/supabase'

const client = useSupabaseClient()
const router = useRouter()
const store = useStore()

onMounted(() => {
  const { search } = window.location
  if (search && search.includes('code')) {
    // Handle the OAuth callback
    client.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        // Fetch profile data including stripe_customer
        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single() as { data: Profile | null }

        store.setUser({
          id: user.id,
          email: user.email as string,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          created_at: user.created_at,
          updated_at: user.last_sign_in_at || user.created_at,
          stripe_customer: profile?.stripe_customer || null
        })
        
        const redirect = useCookie('authRedirect')
        const returnUrl = redirect.value || '/profile'
        redirect.value = null // Clear the redirect cookie
        router.push(returnUrl)
      } else {
        store.setUser(null)
        router.push('/login')
      }
    })
  }
})
</script>

<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex items-center justify-center">
      <div class="text-center">
        <div class="mb-4">
          <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-xl">Completing login...</p>
      </div>
    </div>
  </NuxtLayout>
</template> 