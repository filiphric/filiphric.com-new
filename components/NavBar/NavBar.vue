<template>
  <nav class="grid grid-cols-12 pt-7">
    <div class="col-span-3">
      <NuxtLink to="/" class="text-2xl ">
        Filip Hric
      </NuxtLink>
    </div>
    <div class="col-span-9 grid grid-flow-col gap-7 place-self-end text-xl ">
      <NavBarItem title="Blog" link="/blog" />
      <NavBarItem title="Workshops" link="/workshops" />
      <NavBarItem title="Courses" link="/courses" />
      <NavBarItem title="Community" link="http://filiphric.com/discord" />
      <NavBarItem title="About" link="/about" />
    </div>
  </nav>
</template>
