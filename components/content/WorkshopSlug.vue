<template>
  <ClientOnly>
    <ProseCodeInline>
      git clone https://github.com/filiphric/{{ repo }}.git
    </ProseCodeInline>
    <br>
    <ProseCodeInline>
      cd {{ repo }}
    </ProseCodeInline>
    <br>
    <ProseCodeInline>
      npm install
    </ProseCodeInline>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
const repoQuery = useRouteQuery('repo')
const repo = repoQuery.value?.length ? repoQuery.value : 'cypress-core-workshop'
</script>
