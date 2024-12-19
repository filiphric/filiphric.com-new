<template>
  <NuxtLayout>
    <div class="mx-auto max-w-screen-xl">
      <div class="mx-3 md:mx-10 lg:mx-20">
        <div class="mb-24 mt-7">
          <div class="mt-14 grid grid-cols-1 place-content-center gap-7 md:mb-3 md:grid-cols-2 mx-10" data-cy="hero-element">
          <div class="self-center">
            <h1 class="mb-7 mt-14 text-5xl font-extrabold md:text-left xl:text-7xl">
              {{data.title}}
            </h1>
          </div>
          <div class="place-self-center self-center p-7">
            <div class="shadow-block rotate-1 md:w-full -z-10 relative">
              <Image :src="data.image" alt="Filip Hric" />
            </div>
          </div>
        </div>
          <div class="grid max-w-2xl grid-cols-1 gap-14 lg:max-w-none lg:grid-cols-7">
            <div class="col-span-5">
              <ContentRenderer :value="data" class="text-base font-light md:text-lg" />
            </div>
            <BlogSidebar :links="data.body.toc.links" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>


<script setup>

const { data } = await useAsyncData('speaking-policy', () => queryContent('/speaking-policy').findOne())
</script>

