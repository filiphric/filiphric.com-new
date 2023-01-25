<template>
  <NuxtLayout name="blogpost">
    <ContentDoc v-slot="{ doc }">
      <BlogContent v-if="doc.title" :doc="doc" />
    </ContentDoc>
  </NuxtLayout>
</template>
