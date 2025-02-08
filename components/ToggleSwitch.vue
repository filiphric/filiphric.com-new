<template>
  <div class="flex items-center gap-2">
    <button 
      type="button"
      @click="toggle"
      :class="[
        'w-14 h-7 rounded-full transition-colors relative block border-2 border-black',
        modelValue ? 'bg-lime' : 'bg-gray-200 dark:bg-gray-400'
      ]"
    >
      <span 
        :class="[
          'absolute top-[1px] right-[1px] w-[22px] h-[22px] rounded-full bg-white transition-transform border-2 border-black',
          modelValue ? 'translate-x-0' : '-translate-x-7'
        ]"
      />
    </button>
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script> 