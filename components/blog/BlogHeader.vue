<template>
  <div class="grid grid-cols-1 place-content-center place-self-center md:mb-3 md:grid-cols-2">
    <div class="my-14 grid place-items-center self-center md:place-items-start">
      <h1 class="text-center text-5xl font-extrabold md:text-left lg:text-6xl">
        Learn about testing
      </h1>
      <p class="my-5 text-center text-3xl font-semibold text-gray-400 md:text-left lg:text-4xl">
        Find a topic of your choice
      </p>
      <slot />
    </div>
    <Image src="/blog_ideas_lqj3qe.png" alt="Filip Hric blog" class="hidden place-self-center self-center p-8 dark:mix-blend md:block md:w-full" />
  </div>
</template>
