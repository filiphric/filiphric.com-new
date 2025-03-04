<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto mt-14 p-7">
      <h1 class="text-4xl font-bold mb-7 text-center">Sign in with Email</h1>
      
      <form @submit.prevent="handleMagicLinkSignIn" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full bg-white dark:bg-black-lightest px-4 py-2 border-2 border-black dark:border-black-lightest rounded-none focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
            :disabled="loading"
          />
        </div>

        <ActionButton class="w-full">
          <button
            type="submit" 
            class="w-full bg-white text-xl uppercase"
            :disabled="loading || !email"
          >
            {{ loading ? 'Sending magic link...' : 'Send magic link' }}
          </button>
        </ActionButton>

        <NuxtLink to="/login" class="text-center text-sm text-gray-500 block">
          Or sign in with GitHub
        </NuxtLink>
      </form>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>

      <div v-if="emailSent" class="mt-8 text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-lime mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Check your email</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We've sent a magic link to {{ email }}.<br>
          Click the link in the email to sign in.
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { signInWithOtp } = useSupabaseAuth()
const email = ref('')
const loading = ref(false)
const error = ref('')
const emailSent = ref(false)

const handleMagicLinkSignIn = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { error: err } = await signInWithOtp({
      email: email.value,
      options: {
        // @ts-ignore
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (err) throw err
    
    emailSent.value = true
  } catch (err: any) {
    error.value = 'An error occurred. This may be because magic link was not enabled for your account. Please sign up with GitHub instead.'
  } finally {
    loading.value = false
  }
}
</script> 