<template>
  <NuxtLayout>
    <div class="space-y-6 mt-12">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7">
        Individual Tutoring
      </h2>
      <div class="mt-14 md:mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
        <div class="w-full md:w-1/2 text-center md:text-left">
          <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
            I have a decade of experience with teaching hundreds of developers and testers. I specialize in helping people level up their testing practices. Whether you are starting with test automation or you are looking to level up, I'm ready to help.
          </p>
          <div class="text-lg md:text-xl lg:text-2xl">
            <ActionButton to="https://cal.com/filiphric/tutoring-session" class="-rotate-1">
              Book a session
            </ActionButton>
          </div>
        </div>
        <div class="shadow-block w-full md:w-1/2 overflow-hidden  bg-white dark:bg-transparent rotate-1">
          <Image src="/2023-12-08_11-20-18_bga48t.png" alt="Experience you can trust" class="w-full h-auto" />
        </div>
      </div>
      <section class="pt-14">
        <h2 class="text-4xl font-bold mb-3">What to Expect</h2>
        <ul class="list-disc pl-5 space-y-2 text-lg">
          <li>1-on-1 sessions focused on your specific testing challenges</li>
          <li>Hands-on guidance with your actual codebase and testing suite</li>
          <li>Tailored guidance on best practices for test architecture and maintenance</li>
          <li>Strategies for improving test reliability and performance</li>
          <li>Practical solutions for common (and uncommon) testing pitfalls</li>
        </ul>
      </section>
    </div>
  </NuxtLayout>
</template>