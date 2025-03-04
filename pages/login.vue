<template>
  <NuxtLayout>
    <div class="max-w-md mx-auto mt-14 p-7">
      <h1 class="text-4xl font-bold mb-7 text-center">Sign in with GitHub</h1>
      
      <div>
        <ActionButton class="w-full bg-white text-xl disabled:opacity-50" @click="signInWithGithub" :disabled="loading">
          <div class="flex items-center justify-center gap-3">
            <IconGithub class="w-6 h-6" />
            {{ loading ? 'Redirecting...' : 'Continue with GitHub' }}
          </div>
        </ActionButton>
        <div class="flex justify-center mt-3">
          <NuxtLink to="/magic-link" class="text-sm text-gray-500">Or sign in with magic link</NuxtLink>
        </div>
      </div>

      <div v-if="error" class="mt-4 text-red-500 text-center">
        {{ error }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const { signInWithProvider } = useSupabaseAuth()
const error = ref('')
const loading = ref(false)

const signInWithGithub = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { error: err } = await signInWithProvider('github')
    
    if (err) throw err
  } catch (err: any) {
    error.value = err?.message || 'An error occurred'
  }
}
</script>