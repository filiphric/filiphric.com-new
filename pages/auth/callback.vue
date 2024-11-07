<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex flex-col items-center justify-center">
      <div v-if="error" class="text-center">
        <p class="text-xl text-red-500 mb-4">{{ error }}</p>
        <NuxtLink 
          to="/auth" 
          class="prettyLink"
        >
          Try again
        </NuxtLink>
      </div>
      <div v-else class="text-center">
        <div class="mb-4">
          <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-xl">Completing login...</p>
        <p class="text-gray-500 mt-2">You'll be redirected automatically</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const error = ref('')

onMounted(async () => {
  try {
    // Get the URL hash
    const hash = window.location.hash
    
    if (hash) {
      // Exchange the token
      const { error: err } = await client.auth.getSession()
      if (err) throw err
    }

    // Check if we have a valid session
    const { data: { session } } = await client.auth.getSession()
    
    if (session) {
      // Wait a moment to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigateTo('/profile')
    } else {
      throw new Error('No session found')
    }
  } catch (err) {
    console.error('Auth callback error:', err)
    error.value = 'Error completing login. Please try again.'
  }
})
</script> 