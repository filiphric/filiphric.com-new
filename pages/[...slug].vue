<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <h1 class="text-xl">{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </main>
</template>
