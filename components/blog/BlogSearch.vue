<template>
  <input
    :value="query"
    class="mt-4 h-4 w-96 bg-white p-7 text-lg text-gray-400 outline-none dark:bg-black-lighter md:mt-8 md:h-8 hover:shadow-block-blueberry hover:-translate-y-2 hover:-translate-x-2 transition-all duration-200 border-2 border-black"
    placeholder="Search articles"
    @input="updateValue"
  >
</template>
<script setup lang="ts">

defineProps({
  query: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:query'])

const updateValue = (e: Event) => {
  emit('update:query', (e.target as HTMLInputElement).value)
}

</script>
