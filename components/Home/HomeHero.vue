<template>
  <div class="mt-14 grid grid-cols-1 place-content-center gap-7 md:mb-3 md:grid-cols-2" data-cy="hero-element">
    <div class="self-center">
      <h1 class="mt-14 mb-7 text-center text-5xl font-extrabold md:text-left xl:text-6xl">
        Teaching testers about web development, and developers about testing.
      </h1>
    </div>
    <div class="place-self-center self-center p-7">
      <div :class="styleClasses" class="overflow-hidden rounded-3xl bg-white md:w-full">
        <img src="/filip_lap2mw.png" alt="Filip Hric">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'
const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:bg-transparent dark:shadow-block-none`
</script>
