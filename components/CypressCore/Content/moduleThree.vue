<template>
  <div class="flex justify-center bg-white p-7 py-4 font-bold shadow-block dark:bg-black-dark">
    <div class="w-full p-7">
      <div>
        <Image src="rocket_cxeqeq.png" class="mx-auto mb-7 block w-52" alt="Working with network" />
        <span class="block pb-14 text-center text-3xl font-bold">Session #3<br>Working with network</span>
        <!-- items -->
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-lime" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Intercepting network requests</span>
            <span class="text-md font-normal">Learning how to use cy.intercept() command for testing edge cases</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-blueberry" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">API testing</span>
            <span class="text-md font-normal">Testing data from API and using cy.request() to prepare and handle test data</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-punch" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Installing useful plugins</span>
            <span class="text-md font-normal">Solving common problems with resources from open-source community</span>
          </div>
        </div>
        <div class="mb-2 flex">
          <div class="w-1/12">
            <span class="mt-2 block h-2 w-2 rounded-full bg-tangerine" />
          </div>
          <div class="w-11/12">
            <span class="block text-xl font-extrabold">Handling authentication flow</span>
            <span class="text-md font-normal">Caching a logged in state of browser and managing backend authentication</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
