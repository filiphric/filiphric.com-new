<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="mx-3 md:mx-10 lg:mx-20">
      <div class="mb-24 mt-7">
        <BlogHeading
          :title="data.title"
          :image="data.image"
        />
        <div class="grid max-w-2xl grid-cols-1 gap-14 lg:max-w-none lg:grid-cols-7">
          <div class="col-span-5">
            <ContentRenderer :value="data" class=" text-base font-light md:text-lg" />
          </div>
          <div class="col-span-2 mt-5 hidden lg:block">
            <h2 class="text-2xl font-bold">
              Table of contents:
            </h2>
            <ul>
              <NuxtLink
                v-for="link in data.body.toc.links"
                :key="link.id"
                :to="'#' + link.id"
                class="prettyLink block max-w-fit"
              >
                {{ link.text }}
              </NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('trelloapp', () => queryContent('/setting-up-trello-app').findOne())
</script>
