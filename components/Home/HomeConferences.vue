<template>
  <div class="mt-28 grid grid-cols-2 items-center gap-14">
    <div>
      <h2 class="text-6xl font-bold">
        Conference talks
      </h2>
      <p class="mt-7 text-2xl">
        I have spoken on conferences, webinars and events around the world. I like to do live coding on stage and demonstrate real-life examples and problem solutions.
      </p>
      <div class="pt-7 text-2xl">
        <NuxtLink to="/talks" class="prettyLink inline-block font-bold">
          Learn more <IconArrowForward class="inline transition-all ease-in-out" />
        </NuxtLink>
      </div>
    </div>
    <div :class="styleClasses" class="overflow-hidden rounded-3xl bg-white dark:rounded-none md:w-full">
      <NuxtPicture src="/qbVORmN8_ukrn1u.png" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'
const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:bg-transparent`
</script>
