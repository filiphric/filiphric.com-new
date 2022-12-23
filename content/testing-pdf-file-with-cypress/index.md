---
title: "Testing a PDF file with Cypress"
date: 2022-08-08
published: true
slug: "testing-pdf-file-with-cypress"
description: "How to download a PDF file, check the download and parse out the content of the file for further testing"
tags: ['cypress', 'pdf', 'download']
---
I recently got a question on LinkedIn about Cypress’ ability to test contents of PDF file. At first I thought it is not possible as Cypress is made for testing web applications. But after I thought about it a little more I realized, there are actually couple of ways to approach this problem.

Let’s start with a description of our app. You can clone it [from my GitHub page and see the final solution](https://github.com/filiphric/testing-pdf-with-cypress) described in this blogpost. Basically it’s just a simple html file containing links to two PDF files. Clicking on a button will download them to your computer.

<v-img alt="Page with a download PDF link" src="download-pdf.png" shadow="shadow-lg"></v-img>

## Verifying download
To start off, we can write a simple test to download our file. The test code for this will be simple:
```ts
cy.visit('/')
cy.contains('simple.pdf')
  .click()
```
This test will finish right after we click on our button. But how do we know if anything happened? Well first of all, we can check that manually, by taking a look into `/cypress/downloads` folder, where all of our downloads from test run end up. The destination of downloads can be set up by changing `downloadsFolder` attribute in `cypress.config.ts` file. file:

But how do we actually check whether the file was downloaded? The easiest way of doing so would be to use `cy.readFile()` command. This command will fail if a file is not found, so it’s perfect for our situation.

However, it’s important to note that when we run our tests via `npx cypress open`, downloaded files will get overriden. This is also important, because we can get to a false positive situation when we use `cy.readFile()` command and a file with the same name was present in downloads folder prior to running the test.

This is not the case with `npx cypress run` script as it will automatically delete contents of downloads folder before running. To change this behavior, you can set up `trashAssetsBeforeRuns` option in you `cypress.config.ts` file. file:

Also, while writing your tests, I’d recommend adding `cypress/downloads` folder into your `.gitignore` file so that it does not accidentally end up bloating your repository size.

## Checking contents of the file
While `cy.readFile()` works for making sure the file was downloaded, it doesn’t do a good job with our PDF file. Ironically, there’s a problem with the one thing that the file promises to do. Read file. Just take a look into the console output for the command:

<v-img alt="PDF file content read by Cypress cy.readFile() command" src="pdf-content.png" shadow="shadow-lg"></v-img>

Unfortunately, there is no native way for Cypress to read the contents of our file, so we need to make our own. It’s actually pretty easy using `cy.task()` but there are couple of small gotchas which need to be taken care of.

First of all, let’s create our script. A quick search for pdf parsing on [npmjs.com](http://npmjs.com/) will guide us to a neat little package called [pdf-parse](https://www.npmjs.com/package/pdf-parse). The usage of this package is very nicely explained on its readme page, so let’s no make it our own.

```ts
const fs = require("fs");
const path = require('path')
const pdf = require('pdf-parse');

export const readPdf = (pathToPdf: string) => {

  const resolvedPath = path.resolve(pathToPdf)
  let dataBuffer = fs.readFileSync(resolvedPath);
  pdf(dataBuffer).then(function ({ text }) {

    return text

  });

}
```
We now have a `readPdf` function which will take a `pathToPdf` argument. This will represent a path to our downloads folder. We can now call using `cy.task()` command. But before we are able to do that, we need to add it into our `setupNodeEvents` function in `cypress.config.ts` file:

```ts {2,7-9} [cypress.config.ts]
import { defineConfig } from 'cypress'
import { readPdf } from 'cypress/scripts/readPdf'

export default defineConfig({
  e2e: {
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on('task', {
        readPdf
      })
    },
    baseUrl: 'http://localhost:3000'
  },
});
```

In the config, we are importing our script, which I saved in the `cypress/scripts` folder that I created for myself. In `setupNodeEvents` I’m passing this `readPdf` script. This means that whenever I call `cy.task('readPdf')` my `cypress/scripts/readPdf` will be called and will return the contents of my PDF file.

This now works almost perfectly. There’s a small gotcha here. For some reason we are getting this error:

<v-img alt="PDF file content read by Cypress cy.task() command" src="pdf-task-fail.png" shadow="shadow-lg"></v-img>

It took me some time before realizing that the reason I’m getting this error is that my function is actually still in the process of working through the PDF file and `cy.task()` is not waiting for it to finish. In order to make sure the function actually finishes doing it’s thing, we need to wrap it inside a promise. While promises can be confusing at first (they definitely were for me), in this case the code is pretty simple:

```ts {7,12,15} [cypress/scripts/readPdf.ts]
const fs = require("fs");
const path = require('path')
const pdf = require('pdf-parse');

export const readPdf = (pathToPdf: string) => {

  return new Promise((resolve) => {
    const pdfPath = path.resolve(pathToPdf)
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function ({ text }) {

      resolve(text)

    });
  })

}
```

This way we can ensure that even if the file takes a little while to parse, Cypress will wait for it to finish. In fact, it will wait up to 60 seconds by default. This number can be changed once again, by modifying `cypress.config.ts` and its `taskTimeout` option.

<v-img alt="PDF file content read by Cypress cy.task() command" src="pdf-task.png" shadow="shadow-lg"></v-img>

Our `cy.task()` will yield the text of our PDF to the next command, so we can make an assertion right away:

```ts
cy.task('readPdf', 'cypress/downloads/simple.pdf')
  .should('contain', 'Hello darkness my old friend')
```

Instead of `contain` we can use `eq` assertion, but in that case we need to be mindful of all the whitespaces and line breaks that our text will contain. Complexity of reading and parsing the file will grow as the complexity of tested PDF file grows, but there are many ways to handle it. For example, you can organize all your strings to an array. Every phrase or sentence that is separated by a line break will be its own item in an array:

```ts {8} [cypress/scripts/readPdf.ts]
export const readPdf = (pathToPdf: string) => {

  return new Promise((resolve) => {
    const pdfPath = path.resolve(pathToPdf)
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function ({ text }) {

      const arr = text.split("\n");
      resolve(arr)

    });
  })

}
```

That’s about it. If you found this useful, share it with a friend or community. Maybe there’s someone who will benefit from it as well. If you read this far, you might be interested in subscribing to my newsletter and get notified when there’s a new blog.
