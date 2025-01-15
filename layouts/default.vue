<template>
  <div>
    <div class="mx-auto max-w-screen-xl">
      <NavBarMobileMenu v-if="showMenu" @close:menu="showMenu = false" />
      <div class="mx-3 md:mx-10 lg:mx-20">
        <NavBar @open:menu="showMenu = true" />
        <div class="-ml-3">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
const showMenu = ref(false)

useHead({
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'I teach testers about web development and developers about testing. Blog about Cypress.io full of articles courses and workshops'
    }
  ]
})

</script>
