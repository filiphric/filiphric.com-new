<template>
  <div class="dark:bg-black-darkrounded-lg flex justify-center rounded-lg bg-white p-7 py-4 font-bold shadow-block-lime dark:bg-black-dark dark:shadow-block-dark-lime">
    <div class="w-full p-7">
      <div>
        <NuxtPicture src="tricycle_whgyxo.png" class="mx-auto mb-7 block w-52" />
        <span class="block pb-14 text-center text-3xl font-bold">Session #1<br>Understanding basics</span>
        <!-- items -->
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-lime" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Creating a Cypress project</span>
            <span class="text-md font-normal">Installation and project structure, running Cypress GUI</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-blueberry" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Opening a page</span>
            <span class="text-md font-normal">.visit() command, basic configuration, effective work with browser</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-punch" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Selecting elements</span>
            <span class="text-md font-normal">CSS selectors, data selectors, relative selectors</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-tangerine" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Interaction with the app</span>
            <span class="text-md font-normal">Basic scenario automation, debugging and reading error messages</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-cheese" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Simple assertions</span>
            <span class="text-md font-normal">Using .should() command, best practices for writing tests</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
