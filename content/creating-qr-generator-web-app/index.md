---
title: "Creating a QR generator web app"
date: 2023-06-06
published: true
slug: "creating-qr-generator-web-app"
description: "Tutorial on how to create a simple QR code generator with Vue, Vite and TypeScript"
tags: ["qr code","typescript","vite","vue","development"]
image: vite-qr_nifw1w
cypressVersion:
---
In this tutorial I will show a step by step guide on how to create simple QR generator application using Vue, Vite and TypeScript. At the end, I’m going to show you how to deploy this project using Vercel. This will be a very simple tutorial, so if you are just starting with Web development, it will be ease to follow.

## Scaffolding a default project
We will start by scaffolding a new project with Vite. Vite is a build tool and development server that makes the development fast and super easy. Part of Vite experience is a `create-vite` library, which you can install globally.

```bash
npm install -g create-vite
```

Once you have `create-vite` installed, you can scaffold a new project by using the following command in your terminal:

```bash
create-vite qr-generator
```

This command will start a prompt that will ask you a couple of questions about the project you want to create. 

![create-vite](create-vite.png)

You can choose from variety of frameworks and choose to write your project in Javascript or TypeScript. Once you get past these questions, you can start view your newly created projext by navigating to the newly created folder, installing dependencies and starting the dev server:

```bash
cd qr-generator
npm install
npm run dev
```
This will start the dev server and enable you to view your project live. Console output will let you know which port is being used for the dev server. You can open your application by navigating to this url in your browser.

> **💡 PRO tip:** You can make Vite open your browser by passing following flag: 
> ```bash
> npm run dev -- --open
> ```

You should now see the example application. So far it is very simple but it contains some interesting pointers to how the application works.

![Scaffolded Vue app ](vite_vue_app_ivdnvx)

>During my development I saw an error that said something like: `Failed to load PostCSS config` instead of the app. Apparently, there’s an issue with the default project scaffold that causes the `postcss.config.cjs` file not to create. To fix the issue, create the file and add the following content into it:
> ```js
>module.exports = {
>    autoprefixer: {}
>}
>```
>After creating the file, run `npm run dev` again. Pay attention to the `.cjs` extension, as `.js` would not work.

## What’s in the project
Since this is an entry-level post, I’m going to describe the files that are inside this scaffolded project. [Feel free to skip this part](#editing-the-project) if you are interested in the process and result only.

```treeview
qr-generator/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── App.vue
│   ├── main.ts
│   ├── style.css
│   └── vite-env.d.ts
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

All this may feel like a lot, but the structure is actually pretty simple. Let me walk you through it.

### `index.html`
This HTML is the document that will be served as our page. Notice the highlighted `div` element. This is an entry point element that our application will eventually get rendered to.
```html {10} [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### `src/main.ts` 
The entry point for the application, where the Vue instance is created and mounted. The `createApp()` function on line 5 will use the `#app` element inside the `index.html` and basically put the whole application inside it. 
```ts [main.ts] {5}
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### `src/App.vue` 
The main (or root) component of the Vue application. Essentially, all of the components inside our application will be somehow connected to this one, either directly, or by a parent component. Notice how we use the `HelloWorld` component on line 14.

```html {14} [App.vue]
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

### Other project files
- **TypeScript-related files** - Since we are in a TypeScript project, we have some files that define the behavior of our TypeScript compiler or types related either to Vue or Vite. Some of the files are:
  - `src/vite-env.d.ts`
  - `tsconfig.json`
  - `tsconfig.node.json`
- **Styling-related files** - These add css styles to our application. There are two files in our project related to this:
  - `src/style.css` - a classic CSS file with all the global styles used in our application
  - `postcss.config.cjs` - configuration file for PostCSS. This is a tool that enables transformation of CSS using JavaScript plugins. For example, in our project it uses "autoprefixer" plugin that makes sure that CSS styles we use will work on browsers like Safari and Firefox
- `vite.config.ts` - The configuration file for Vite. Vite is what builds our app. In other words, it will make sure that all of our `.vue` components will essentially become a mix of `html`, `css` and `js` that the browser can read.

## Editing the project
As a first step, I’m going to remove all the files that I will not be using in my project. This will include `HelloWorld` component, and all the logos in `public` and `src/assets` folder. I will also edit my `App.vue` file so that it will look like this:

```html [App.vue]
<script setup lang="ts">
</script>

<template>
  <div></div>
</template>

<style scoped>
</style>
```
I will also edit my `index.html` style to remove reference to the `vite.svg` logo and add my own title:

```html [index.html] {6}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QR generator</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## Adding the QR code generator
Let’s now create the component named `QRCode.vue` that will be at heart of our application. It will contain just three elements. A heading, `textarea` where we’ll add the text that we want to convert to QR code, and the `img` element where the QR code renders.
```html {2-3}
<template>
  <textarea  />
  <img />
</template>
<script setup lang="ts">
</script>
```

For generating the QR code, we’ll install `qrcode` package and its types:
```
npm install qrcode @types/qrcode
```
To use this package, we are going to import it into the project and create a function that will generate the source of our `img` element.
```html {3, 6-13}
<template>
  <h1> QR code generator</h1>
  <textarea  />
  <img :src="QRResult" />
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import { ref } from 'vue';

const QRResult = ref()

const generateQR = async(text: string) => {
  QRResult.value = await QRCode.toDataURL(text)
}
</script>
```
Whenever this function is called, it will update the value of the `QRResult` variable. We are using `ref()` to make this variable reactive. In other words, whenever we call `generateQR` function, the `QRResult` will update. We are passing the `QRResult` into our `img` element so if the value changes, our image will change as well. 

We can now add our component into the `App.vue`, so that we can see how it behaves. 
```html
<template>
  <QRCode />
</template>
<script setup lang="ts">
import QRCode from './components/QRcode.vue'
</script>
```

Right now, we can only see the `textarea` and no image. This is because our `img` element has no value in the `src` attribute. 

![empty QR code generator](empty_qr_generator_zhfe1c.png)

The goal is to generate the QR code as soon as we start typing into the text area. To achieve this, we are going to create another `ref()` variable and use `v-model` to bind the `textarea` value to it. If user starts typing into `textarea` our variable will update. 
```html {3,11}
<template>
  <h1> QR code generator</h1>
  <textarea v-model="qrText" />
  <img :src="QRResult" />
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import { ref } from 'vue';

const QRResult = ref()
const qrText = ref()

const generateQR = async(text: string) => {
  QRResult.value = await QRCode.toDataURL(text)
}
</script>
```
This however is not enough. We need to call our `generateQR` function with the value from `textarea` whenever usre types into it. To achieve this, we’ll add `@input` directive, that will add an event listener for any user input. This is where we can all our function.
```html {3}
<template>
  <h1> QR code generator</h1>
  <textarea v-model="qrText" @input="generateQR(qrText)"/>
  <img :src="QRResult" />
</template>
<script setup lang="ts">
import QRCode from 'qrcode'
import { ref } from 'vue';

const QRResult = ref()
const qrText = ref()

const generateQR = async(text: string) => {
  QRResult.value = await QRCode.toDataURL(text)
}
</script>
```
We can now see the QR code update whenever we start typing into the `textarea`. With some CSS added to center our content, the result looks like this:

![QR code generator](qr_code_whrcmd.gif)

## Finishing touches
Right now, the QR code will be visible even if we delete all the typed text. Also, it would be nice if our `textarea` was focused when we open the page.

To display 