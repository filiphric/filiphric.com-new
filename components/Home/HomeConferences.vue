<template>
  <div class="mt-14 md:mt-28 flex flex-col md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
    <div class="w-full md:w-1/2 text-center md:text-left">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7">
        Conference talks
      </h2>
      <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
        I am an international keynote speaker. I have spoken on conferences, webinars and events around the world. I like to do live coding on stage and demonstrate real-life examples and problem solutions.
      </p>
      <div class="text-lg md:text-xl lg:text-2xl">
        <NuxtLink to="/talks" class="prettyLink inline-block font-bold">
          Learn more <IconArrowForward class="inline transition-all ease-in-out" />
        </NuxtLink>
      </div>
    </div>
    <div :class="styleClasses" class="w-full md:w-1/2 overflow-hidden rounded-3xl bg-white dark:bg-transparent">
      <Image src="/qbVORmN8_ukrn1u.png" alt="Filip Hric on conference stage" class="w-full h-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'
const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:bg-transparent`
</script>
