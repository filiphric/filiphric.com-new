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
const user = useSupabaseUser()
const error = ref('')

// Watch for user auth state
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/profile')
  }
}, { immediate: true })

// Handle the hash fragment from OAuth
onMounted(() => {
  const handleCallback = async () => {
    try {
      const { error: err } = await client.auth.getSession()
      if (err) throw err
    } catch (err) {
      error.value = 'Error completing login. Please try again.'
      console.error('Auth callback error:', err)
    }
  }

  handleCallback()
})
</script> 