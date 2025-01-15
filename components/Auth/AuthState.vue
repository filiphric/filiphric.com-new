<template>
  <div 
    class="relative"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <template v-if="user">
      <button class="flex items-center w-8 h-8">
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
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-black-light shadow-block-lime dark:shadow-block-dark-lime z-10 border-2 border-black"
      >
        <div class="absolute h-4 w-full -top-4"></div>
        <div class="py-2">
          <NuxtLink 
            to="/profile"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-lighter"
          >
            Profile
          </NuxtLink>
          <NuxtLink 
            to="/profile"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-lighter"
          >
            Your Courses
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
        to="/login"
        class="prettyLink"
      >
        Login
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const store = useStore()
const isOpen = ref(false)
const { signOut } = useSupabaseAuth()

const profile = computed(() => ({
  avatar_url: store.user?.avatar_url,
  full_name: store.user?.full_name || "User avatar"
}))

const handleLogout = async () => {
  isOpen.value = false
  await signOut()
  navigateTo('/login')
}
</script>

<style scoped>
.relative {
  isolation: isolate;
}
</style>