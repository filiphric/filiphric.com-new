<template>
  <div class="mt-7 mb-14 text-center text-xs font-normal text-gray-400">
    <p class="mx-auto w-1/2 pb-5">
      I noticed that you're from {{ countryName }}. 👋 To make this workshop more accessible I am offering purchasing power parity pricing.
    </p>
    <p>If that is something that you need:</p>
    <button
      class="my-5 mx-auto block bg-white px-7 py-3 font-bold uppercase text-black shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:text-white dark:shadow-block-dark-blueberry dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-blueberry"
      @click="$emit('applyDiscount')"
    >
      Activate {{ (info.amount * 100).toFixed(0) }}% discount
    </button>
  </div>
</template>
<script setup lang="ts">
import countries from '@/constants/countries.json'
const props = defineProps({
  info: {
    type: Object,
    default: () => { return {} }
  }
})

defineEmits(['applyDiscount'])

const countryName = countries.find(c => c.code === props.info.country)?.name

</script>
