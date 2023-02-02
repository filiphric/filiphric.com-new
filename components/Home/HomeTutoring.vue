<template>
  <div class="mt-28 grid grid-cols-2 items-center gap-14">
    <div :class="styleClasses" class="overflow-hidden rounded-3xl bg-white dark:rounded-none md:w-full">
      <NuxtPicture src="/P9260361_bpzp0e.jpg" />
    </div>
    <div>
      <h2 class="text-6xl font-bold">
        Tutoring
      </h2>
      <p class="mt-7 text-2xl">
        I help individuals grow and improve their test automation game. Together we solve obscure testing problems, brainstorm solutions or prepare for technical interviews.
      </p>
      <div class="pt-7 text-2xl">
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
