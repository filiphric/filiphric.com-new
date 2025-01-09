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