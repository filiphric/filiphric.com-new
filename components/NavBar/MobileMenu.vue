<template>
  <div class="fixed z-10 grid h-screen w-screen auto-rows-min text-clip bg-black-light">
    <div class="mx-3 mb-14 grid self-start justify-self-end pt-7 ">
      <button
        class="place-self-end"
        @click="$emit('close:menu')"
      >
        <IconClose class="h-12 w-12 rounded-full border border-gray-400 fill-gray-200 p-2 md:hidden" />
      </button>
    </div>
    <NavBarItems @click="$emit('close:menu')" />
  </div>
</template>
<script setup lang="ts">
defineEmits(['close:menu'])
</script>
