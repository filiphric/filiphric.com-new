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
      <Image src="/99_tips_improved_imta25.png" alt="99 Cypress Tips" />
      <h2 class="text-2xl font-extrabold text-center">
        99 Cypress Tips
      </h2>
      <p class="text-center mt-7">Interested in more tips? Check out my new course!</p>
      <div class="mt-5 flex justify-center">
        <ActionButton
          to="/course/99-cypress-tips"
        >
          Learn more
        </ActionButton>
      </div>
    </NuxtLink>
  </div>
</template>