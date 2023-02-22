<template>
  <div class="mt-28 grid grid-cols-2 items-center gap-14">
    <div>
      <h2 class="text-6xl font-bold">
        Workshops
      </h2>
      <p class="mt-7 text-2xl">
        I conduct live and online workshops on Cypress.io. I am a big believer of learning by doing. This is why you can expect hands-on experience instead of lengthy lecture. Over the years, I have taught hundreds of participants on how to effectively use Cypress.io and helped them apply best practices.
      </p>
      <div class="pt-7 text-2xl">
        <NuxtLink to="/workshops" class="prettyLink inline-block font-bold">
          Learn more <IconArrowForward class="inline transition-all ease-in-out" />
        </NuxtLink>
      </div>
    </div>
    <div :class="styleClasses" class="overflow-hidden rounded-3xl bg-white dark:rounded-none md:w-full">
      <NuxtImg src="/5461DD52-D854-4811-A697-511EA508E4B7_1_105_c_y2slsp.jpg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'
const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:bg-transparent`
</script>
