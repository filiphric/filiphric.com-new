<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto mt-14 p-7">
      <h1 class="text-4xl font-bold mb-7 text-center">Sign in with GitHub</h1>
      
      <div class="space-y-4">
        <button 
          @click="signInWithGithub"
          :disabled="loading"
          class="w-full bg-white px-7 py-3 text-xl font-black uppercase transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-block-hover-lime dark:bg-black-lighter flex items-center justify-center gap-3 disabled:opacity-50 border-2 border-black"
        >
          <IconGithub class="w-6 h-6" />
          {{ loading ? 'Connecting...' : 'Continue with GitHub' }}
        </button>

        <p class="text-center text-sm text-gray-500 mt-5">
          By continuing, you agree to create an account and accept the 
          <NuxtLink to="/privacy-policy" class="prettyLink font-extrabold">privacy policy</NuxtLink>.
        </p>
      </div>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const error = ref('')
const loading = ref(false)

// Redirect if already logged in
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/profile')
  }
}, { immediate: true })

const signInWithGithub = async () => {
  try {
    loading.value = true
    error.value = ''
    const { error: err } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'read:user user:email'
      }
    })
    if (err) throw err
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>