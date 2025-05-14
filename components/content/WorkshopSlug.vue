<template>
  <ClientOnly>
    <ProseCodeInline v-if="repoQuery">
      git clone https://github.com/filiphric/{{ repoQuery }}.git
    </ProseCodeInline>
    <ProseCodeInline v-else>
      git clone https://github.com/filiphric/cypress-core-workshop.git
    </ProseCodeInline>
    <br>
    <ProseCodeInline v-if="repoQuery">
      cd {{ repoQuery }}
    </ProseCodeInline>
    <ProseCodeInline v-else>
      cd cypress-core-workshop
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
</script>
