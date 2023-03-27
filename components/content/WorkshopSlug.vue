<template>
  <div>
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
  </div>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
const repo = useRouteQuery('repo')
</script>
