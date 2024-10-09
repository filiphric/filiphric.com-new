<template>
  <div>
    <div class="mx-auto max-w-screen-xl">
      <NavBarMobileMenu v-if="showMenu" @close:menu="showMenu = false" />
      <div class="mx-3 md:mx-10 lg:mx-20">
        <NavBar @open:menu="showMenu = true" />
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
const showMenu = ref(false)

</script>
