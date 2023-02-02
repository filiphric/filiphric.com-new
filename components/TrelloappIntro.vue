<template>
  <div class="text-lg">
    <ProseP>We are about to meet on <ProseStrong>{{ workshop }}</ProseStrong> and I hope you are looking forward to it as much as I do 😃</ProseP>
    <ProseP>These are preparation instructions that will help you out with preparation for the workshop. Please don’t delay this to the last minute, because if any problems occur, we’ll have more time to iron them out. If there’s anything that does not work, please contact me and I’m sure we’ll be able to solve it all.</ProseP>
    <ProseH2 id="requirements">
      Requirements
    </ProseH2>
    <ProseLi>Node.js v16 or higher</ProseLi>
    <ProseLi>git v2.3 or higher</ProseLi>
    <ProseLi>Code editor (VS Code, Webstorm or any other)</ProseLi>
    <ProseLi>Terminal or other Command line interface (Bash, Zsh)</ProseLi>
    <ProseH2 id="clone-and-install-repository">
      Installation
    </ProseH2>
    <ProseP>Open your terminal or the command line and type these commands:</ProseP>
    <ProseCodeInline>https://github.com/filiphric/{{ repo }}.git</ProseCodeInline>
    <br>
    <ProseCodeInline>cd {{ repo }}</ProseCodeInline>
    <br>
    <ProseCodeInline>npm install</ProseCodeInline>
    <ProseP>If you have ever installed a project from GitHub, this should be easy. If not, I’m sure you’ll manage. But if any problems occur, check out the troubleshooting section of this article.</ProseP>
  </div>
</template>
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

const repo = useRouteQuery('repo')
const workshop = useRouteQuery('workshop')
</script>
