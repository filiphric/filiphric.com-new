<template>
  <div class="mt-14">
    <h2 class=" mb-14 text-center text-5xl font-extrabold md:text-left lg:text-6xl">
      Get ready to up your Cypress game
    </h2>
    <div class="mx-auto my-14 grid w-full gap-7 rounded-lg bg-ivory-dark p-7 font-bold dark:bg-black-dark md:w-10/12 md:grid-cols-2">
      <div>
        <NuxtPicture src="core_workshop_2_q9fzxv.png" class="mx-auto block w-64" />
        <div class="text-center text-2xl">
          Cypress core workshop
        </div>
      </div>
      <div class="self-center">
        <div class="mb-7 text-center text-6xl font-extrabold md:text-left">
          400 €
        </div>
        <span class="my-2 block text-sm font-normal italic">You will get:</span>
        <div><IconCheckmarkRound class="mr-2 inline-block w-5 fill-lime pb-1" />Certificate endorsed by Cypress DX team</div>
        <div><IconCheckmarkRound class="mr-2 inline-block w-5 fill-lime pb-1" />Lifetime access to Discord support channel</div>
        <div><IconCheckmarkRound class="mr-2 inline-block w-5 fill-lime pb-1" />Repository with real application</div>
        <div><IconCheckmarkRound class="mr-2 inline-block w-5 fill-lime pb-1" />Coding challenges and learning materials</div>
        <div><IconCheckmarkRound class="mr-2 inline-block w-5 fill-lime pb-1" />Discount for spreading the word (info in FAQ)</div>
      </div>
    </div>
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
              Fill in the name and email of the workshop attendee. Clicking on the "Register" button will take you to the payment page. You’ll receive a receipt and invoice for the payment to your email.
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
