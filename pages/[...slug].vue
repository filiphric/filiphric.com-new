<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <div class="mt-7">
        <BlogHeading
          :cypress-version="doc.cypressVersion"
          :date="doc.date"
          :title="doc.title"
          :image="doc.image"
          :reading-time="doc.readingTime.text"
        />
        <div class="grid max-w-2xl grid-cols-1 gap-14 lg:max-w-none lg:grid-cols-7">
          <div class="col-span-5">
            <ContentRenderer :value="doc" class=" text-base font-light md:text-lg xl:max-w-4xl" />
            <BlogShareLinks :blog-info="doc" />
          </div>
          <div class="col-span-2 mt-5 hidden lg:block">
            <h2 class="text-2xl font-bold">
              Upcoming workshops
            </h2>
          </div>
        </div>
      </div>
    </ContentDoc>
  </main>
</template>
