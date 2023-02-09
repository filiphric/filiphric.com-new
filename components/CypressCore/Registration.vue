<template>
  <div class=" bg-ivory-dark p-7 dark:bg-black">
    <h2 class="mt-7 mb-14 text-center text-6xl font-extrabold">
      Registration
    </h2>
    <div class="grid grid-cols-1 gap-7 md:grid-cols-2">
      <div class="w-full px-4">
        <ol class="relative border-l border-gray-700">
          <li class="ml-4">
            <div class="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-400" />
            <time class="mb-1 text-sm font-normal leading-none text-gray-400">First step</time>
            <h3 class="text-lg font-black">
              Sign up for the workshop
            </h3>
            <p class="mb-7 text-base font-normal">
              Fill in the name and email of the workshop attendee. Clicking on the button below will take you to the payment page. You’ll receive a receipt and invoice for the payment to your email.
            </p>
          </li>
          <li class="ml-4">
            <div class="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-400" />
            <time class="mb-1 text-sm font-normal leading-none text-gray-400">Second step</time>
            <h3 class="text-lg font-black">
              Receive confirmation email
            </h3>
            <p class="mb-7 text-base font-normal">
              I’ll send you an email to let you know that I received the payment and that you are registered for the workshop. Feel free to reply or ask me anything.
            </p>
          </li>
          <li class="ml-4">
            <div class="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gray-400" />
            <time class="mb-1 text-sm font-normal leading-none text-gray-400">Third step</time>
            <h3 class="text-lg font-black">
              Three days before the workshop
            </h3>
            <p class="mb-7 text-base font-normal">
              You’ll receive an email with preparation instructions, zoom link for the workshop and all the information you’ll need.
            </p>
          </li>
        </ol>
      </div>
      <WorkshopsRegisterForm :info="workshopInfo" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  workshopInfo: {
    type: Object,
    default: undefined
  }
})
</script>
