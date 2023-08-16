<template>
  <div class="mt-28 grid grid-cols-2 items-center gap-14">
    <div :class="styleClasses" class="overflow-hidden rounded-3xl bg-white md:w-full">
      <Image src="/Filip_foto_exxwjl.jpg" alt="Filip Hric consulting a testin project" />
    </div>
    <div>
      <h2 class="text-6xl font-bold">
        Consultations
      </h2>
      <p class="mt-7 text-2xl">
        I help companies deliver high-quality software by setting up a healthy testing culture. I have helped review test automation suites as well as quality processes in various startups.
      </p>
      <div class="pt-7 text-2xl">
        <NuxtLink to="/consultations" class="prettyLink inline-block font-bold">
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
