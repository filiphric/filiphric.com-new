<template>
  <div class="grid grid-cols-1 place-content-center place-self-center md:mb-3 md:grid-cols-2">
    <div class="my-14 grid place-items-center self-center md:place-items-start">
      <h1 class="text-center text-5xl font-extrabold md:text-left lg:text-6xl">
        Live online workshops
      </h1>
      <p class="my-5 text-center text-2xl font-semibold text-gray-400 md:text-left lg:text-3xl">
        Join one of the upcoming workshops to learn something new or level up your testing skills
      </p>
      <slot />
    </div>
    <nuxt-picture src="/workshops_ii41od.png" class="hidden place-self-center self-center p-8 dark:mix-blend-lighten md:block md:w-full" />
  </div>
</template>
