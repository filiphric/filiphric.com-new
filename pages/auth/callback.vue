<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
  const { search } = window.location
  if (search && search.includes('code')) {
    // Handle the OAuth callback
    client.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const redirect = useCookie('authRedirect')
        const returnUrl = redirect.value || '/profile'
        redirect.value = null // Clear the cookie
        router.push(returnUrl)
      } else {
        router.push('/auth')
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