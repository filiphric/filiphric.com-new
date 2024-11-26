<template>
  <div>
    <h2 class="mt-7 text-2xl font-bold">
      Featured course:
    </h2>
    <NuxtLink 
      :to="`/course/99-cypress-tips`" 
      class="mt-5 block bg-ivory-dark p-5 dark:bg-black-lighter"
      @click="useTrackEvent('sidebarFeaturedCourseClick')"
    >
      <Image src="/99-tips_w1obly.png" alt="99 Cypress Tips" />
      <h2 class="text-2xl font-extrabold">
        99 Cypress Tips
      </h2>
      <button class="text-lg mt-5 w-full bg-white dark:bg-black-lightest px-7 py-3 font-black uppercase hover:shadow-block-lime transition-all hover:-translate-y-2 border-2 border-black dark:border-black-dark hover:-translate-x-2">
          Learn more
        </button>
    </NuxtLink>
  </div>
</template>