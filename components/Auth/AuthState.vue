<template>
  <div class="relative">
    <template v-if="user">
      <button 
        @click="isOpen = !isOpen"
        class="flex items-center w-8 h-8"
      >
        <img 
          v-if="profile?.avatar_url"
          :src="profile.avatar_url" 
          :alt="profile?.full_name"
          class="w-8 h-8 rounded-full block"
        >
        <IconUser 
          v-else
          class="w-6 h-6 pt-1" 
        />
      </button>

      <!-- Dropdown Menu -->
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-black-light shadow-block-lime dark:shadow-block-dark-lime"
      >
        <div class="py-2">
          <NuxtLink 
            to="/profile"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-lighter"
            @click="isOpen = false"
          >
            Profile
          </NuxtLink>
          <button 
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-lighter"
          >
            Logout
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <NuxtLink 
        to="/auth"
        class="prettyLink"
      >
        Login
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const isOpen = ref(false)
const profile = ref<any>(null)

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isOpen.value = false
    }
  })
})

// Fetch user profile data
watchEffect(async () => {
  if (user.value) {
    const { data: { user: userData } } = await client.auth.getUser()
    profile.value = {
      avatar_url: userData?.user_metadata?.avatar_url,
      full_name: userData?.user_metadata?.full_name
    }
  } else {
    profile.value = null
  }
})

const handleLogout = async () => {
  isOpen.value = false
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<style scoped>
.relative {
  isolation: isolate;
}
</style>