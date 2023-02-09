<template>
  <div class="dark:bg-black-darkrounded-lg flex justify-center rounded-lg bg-white p-7 py-4 font-bold shadow-block-cheese dark:bg-black-dark dark:shadow-block-dark-cheese">
    <div class="w-full p-7">
      <div>
        <NuxtPicture src="magnifying_glas_zpnzd9.png" class="mx-auto mb-7 block w-52" />
        <span class="block pb-14 text-center text-3xl font-bold">Session #2<br>Get to know Cypress</span>
        <!-- items -->
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-lime" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Command chaining</span>
            <span class="text-md font-normal">Explanation of how information is passed through commands</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-blueberry" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Retryability</span>
            <span class="text-md font-normal">Testing a dynamic, always re-rendering site and applying retryability principles</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-punch" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Saving and using aliases</span>
            <span class="text-md font-normal">How to save and alias information, and pass it around your test</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-tangerine" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Creating custom commands</span>
            <span class="text-md font-normal">Abstracting test logic into separate command, expanding Cypress library with own commands</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
