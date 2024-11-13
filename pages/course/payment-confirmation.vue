<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex items-center justify-center">
      <div class="max-w-md mx-auto p-7 text-center">
        <div class="mb-7">
          <svg class="w-16 h-16 text-lime mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 class="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p class="text-xl mb-7">Thank you for your purchase. You can now access your course in your profile.</p>
        
        <NuxtLink 
          to="/profile" 
          class="inline-block bg-white px-7 py-3 text-xl font-black uppercase transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-block-hover-lime dark:bg-black-lighter border-2 border-black"
        >
          Go to Profile
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const router = useRouter()

// Redirect to login if not authenticated
watchEffect(() => {
  if (!user.value) {
    router.push({
      path: '/login',
      query: { redirectTo: '/course/payment-confirmation' }
    })
  }
})
</script> 