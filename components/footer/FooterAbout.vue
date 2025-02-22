<template>
  <div>
    <h2 class="text-xl font-bold">
      General
    </h2>
    <div class="my-7 grid grid-flow-row gap-1">
      <NuxtLink to="/about" class="prettyLink max-w-fit">
        About me
      </NuxtLink>
      <NuxtLink to="/about#conference-appearances" class="prettyLink max-w-fit">
        Conference appearances
      </NuxtLink>
      <NuxtLink to="/private-workshops" class="prettyLink max-w-fit">
        Private workshops
      </NuxtLink>
      <NuxtLink to="/company-consulting" class="prettyLink max-w-fit">
        Company consulting
      </NuxtLink>
      <NuxtLink to="/individual-tutoring" class="prettyLink max-w-fit">
        Individual tutoring
      </NuxtLink>
      <NuxtLink to="/content-authoring" class="prettyLink max-w-fit">
        Video & blog authoring
      </NuxtLink>
      <button
        @click="toggleTheme"
        class="flex items-center gap-2 prettyLink max-w-fit"
      >
        <IconSun v-if="dark" class="h-5 w-5 fill-current" />
        <IconMoon v-else class="h-5 w-5 fill-current" />
        Switch to {{ dark ? 'Light mode' : 'Dark mode' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const dark = ref(false)

onMounted(() => {
  dark.value = localStorage.getItem('theme') === 'dark'
})

const toggleTheme = () => {
  if (dark.value) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    dark.value = false
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    dark.value = true
  }
}
</script>
