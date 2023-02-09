<template>
  <div>
    <ContentBlock image="/core_workshop_2_q9fzxv.png" alt="Cypress core workshop">
      <template #heading>
        Cypress core workshop
      </template>
      <template #paragraph>
        <div>
          <div class="text-md mt-4 text-gray-400">
            {{ days }},
            <div class="my-1 block text-2xl text-black dark:text-white">
              starting {{ date }}
            </div>
            <div class="block text-gray-400">
              always from {{ time }}
            </div>
            <div class="prettyLink mt-6 inline-block cursor-pointer">
              <span class="pr-3">🗓️</span>Download the calendar event to check your timezone
            </div>
          </div>
        </div>
      </template>
      <template v-if="description" #description>
        {{ description }}
      </template>
      <template v-else #description>
        Next date will be announced soon. Subscribe to newsletter if you want to be notified.
      </template>
    </ContentBlock>
  </div>
</template>
<script setup lang="ts">
defineProps({
  description: {
    type: String,
    default: undefined
  },
  days: {
    type: String,
    default: undefined
  },
  date: {
    type: String,
    default: undefined
  },
  time: {
    type: String,
    default: undefined
  }
})
</script>
