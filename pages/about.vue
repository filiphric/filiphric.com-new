<template>
  <NuxtLayout>
    <div class="mt-14 grid grid-cols-1 place-content-center gap-7 md:mb-3 md:grid-cols-2 mx-10" data-cy="hero-element">
      <div class="self-center">
        <h1 class="mb-7 mt-14 text-center text-5xl font-extrabold md:text-left xl:text-6xl">
          Hey, I'm Filip
        </h1>
        <p class="text-lg md:text-4xl mb-5 md:mb-7">I teach testers about web development, and developers about testing.</p>
      </div>
      <div class="place-self-center self-center p-7">
        <div class="shadow-block rotate-1 md:w-full -z-10 relative">
          <Image src="/small_square_kdhln0.png" alt="Filip Hric" />
        </div>
      </div>
      <ConferenceAppearances />
    </div>
  </NuxtLayout>
</template>
