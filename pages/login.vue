<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto mt-14 p-7">
      <h1 class="text-4xl font-bold mb-7 text-center">Sign in with GitHub</h1>
      
      <div class="space-y-4">
        <button 
          @click="signInWithGithub"
          :disabled="loading"
          class="w-full bg-white px-7 py-3 text-xl font-black uppercase transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-block-lime dark:bg-black-lighter flex items-center justify-center gap-3 disabled:opacity-50 border-2 border-black"
        >
          <IconGithub class="w-6 h-6" />
          {{ loading ? 'Connecting...' : 'Continue with GitHub' }}
        </button>
      </div>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const error = ref('')
const loading = ref(false)
const route = useRoute()

// Store redirect URL if present in query params
if (route.query.redirectTo) {
  const redirect = useCookie('authRedirect')
  redirect.value = route.query.redirectTo as string
}

const signInWithGithub = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { error: err } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (err) throw err
  } catch (err: any) {
    error.value = err?.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>