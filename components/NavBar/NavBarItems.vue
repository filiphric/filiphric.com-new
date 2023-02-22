<template>
  <div class="grid grid-flow-row place-items-center gap-14 text-4xl font-semibold md:grid md:grid-flow-col md:gap-7 md:place-self-end md:text-xl md:font-medium">
    <NavBarItem title="Home" link="/" class="md:hidden" />
    <NavBarItem title="Blog" link="/blog" />
    <NavBarItem title="Workshops" link="/workshops" />
    <!-- <NavBarItem title="Courses" link="/courses" /> -->
    <NavBarItem title="Community" link="https://discord.com/invite/3MdvPfT" />
    <NavBarItem title="About" link="/about" />
    <button
      @click="toggleTheme()"
    >
      <IconSun v-if="dark" class="h-7 w-7 fill-current pb-1" />
      <IconMoon v-else class="h-7 w-7 fill-current pb-1" />
    </button>
  </div>
</template>
<script setup lang="ts">

const dark = ref()

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
