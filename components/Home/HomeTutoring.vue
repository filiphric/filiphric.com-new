<template>
  <div class="mt-14 md:mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
    <div :class="styleClasses" class="w-full md:w-1/2 overflow-hidden rounded-3xl bg-white dark:bg-transparent">
      <Image src="/P9260361_bpzp0e" alt="Filip Hric tutoring an individual" class="w-full h-auto" />
    </div>
    <div class="w-full md:w-1/2 text-center md:text-left">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7">
        Tutoring
      </h2>
      <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
        I help individuals grow and improve their test automation game. Together we solve obscure testing problems, brainstorm solutions or prepare for technical interviews.
      </p>
      <div class="text-lg md:text-xl lg:text-2xl">
        <NuxtLink to="/individual-tutoring" class="prettyLink inline-block font-bold">
          Learn more <IconArrowForward class="inline transition-all ease-in-out" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'
const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:bg-transparent`
</script>
