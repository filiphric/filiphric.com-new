<template>
  <div class="mt-14 grid grid-cols-1 place-content-center md:mb-3 md:grid-cols-2">
    <div class="self-center">
      <h1 class="mt-14 text-center text-5xl font-extrabold md:text-left lg:text-6xl">
        Learn about testing
      </h1>
      <p class="my-5 text-center text-3xl font-semibold text-gray-400 md:text-left lg:text-4xl">
        Find a topic of your choice
      </p>
      <slot />
    </div>
    <nuxt-picture src="/blog_ideas_lqj3qe.png" class="place-self-center self-center p-8 dark:mix-blend-lighten md:w-full" />
  </div>
</template>
