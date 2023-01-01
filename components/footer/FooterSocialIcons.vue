<template>
  <div>
    <h2 class="text-xl font-bold">
      Follow me:
    </h2>

    <div class="my-7 grid grid-flow-row">
      <a class="prettyLink h-8 max-w-fit" href="https://twitter.com/filip_hric">
        <IconTwitter class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          Twitter
        </p>
      </a>
      <a class="prettyLink h-8 max-w-fit" href="http://www.linkedin.com/in/filip-hric">
        <IconLinkedin class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          LinkedIn
        </p>
      </a>
      <a class="prettyLink h-8 max-w-fit" href="https://filiphric.com/discord">
        <IconDiscord class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          Discord
        </p>
      </a>
      <a class="prettyLink h-8 max-w-fit" href="https://github.com/makenotion">
        <IconGithub class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          GitHub
        </p>
      </a>
      <a class="prettyLink h-8 max-w-fit" href="https://www.youtube.com/@filip_hric">
        <IconYoutube class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          YouTube
        </p>
      </a>
      <NuxtLink class="prettyLink h-8 max-w-fit" to="/rss.xml">
        <IconRss class="mr-2 inline w-5 pb-1" /><p class="inline text-left">
          RSS feed
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
