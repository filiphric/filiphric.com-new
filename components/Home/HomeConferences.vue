<template>
  <div class="mt-14 md:mt-28 flex flex-col md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
    <div class="w-full md:w-1/2 text-center md:text-left">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7">
        Conference talks
      </h2>
      <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
        I am an international keynote speaker. I like to do live coding on stage and demonstrate real-life examples and problem solutions.
      </p>
      <div class="text-lg md:text-xl lg:text-2xl">
        <ActionButton to="/talks" class="rotate-1">
          Learn more
        </ActionButton>
      </div>
    </div>
    <div class="shadow-block w-full md:w-1/2 overflow-hidden  bg-white dark:bg-transparent -rotate-1">
      <Image src="/conference_ryhkey.png" alt="Filip Hric on conference stage" class="w-full h-auto" />
    </div>
  </div>
</template>