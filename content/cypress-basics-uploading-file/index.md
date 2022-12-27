---
title: "Cypress basics: Uploading a file"
date: 2022-07-27
published: true
slug: "cypress-basics-uploading-file"
description: "How to upload a file with drag and drop elements, inputs or directly by calling your API"
tags: ['cypress', 'upload', 'dropzone', 'file']
---
This blog post is a part of "Cypress basics" series. It is my attempt of breaking down some of the basics and explain all the nuts and bolts of the process. If you want to learn more, click on any article of this series.

- [Selecting elements](/cypress-basics-selecting-elements)
- [Where did my cookies disappear?](/cypress-basics-where-did-my-cookies-disappear)
- [Check if element exists](/cypress-basics-check-if-element-exists)
- [before(), beforeEach(), after() and afterEach()](/cypress-basics-before-beforeeach-after-aftereach)
- [Check attributes, value and text](/cypress-basics-check-attributes-value-and-text)
- [xpath vs. CSS selectors](/cypress-basics-xpath-vs-css-selectors)
- [Variables](/cypress-basics-variables)
- [API testing](/cypress-basics-api-testing)

File uploading can be done in various ways, but all of them have a couple of things in common. Most notably, when dealing with file upload, we need to have our frontend ready to accept the file, and then we need to have our backend ready to handle the file. Let’s start with frontend and how we can make an upload using Cypress.

## Uploading a file with Cypress
[Starting with version 9.3.0](https://docs.cypress.io/guides/references/changelog#9-3-0), Cypress has a `.selectFile()` command which can handle all the file uploads you’ll need. The usage is simple:

```js
cy.get('#upload')
  .selectFile('cypress/fixtures/logo.png')
```

So, which element do we need to select? This is where we get to dive into the code a little. Everytime you do an upload, there is an `<input type=file>` element present on the page. Even if you don’t see it, I assure you it’s there. It’s an HTML5 element that provides your application an API to communicate with your browser and open that "choose file" window. This is how this element normally renders on page:

<v-img alt="Choose a file to upload" src="choose-file.png" shadow="shadow-lg w-1/2"></v-img>

However, when we want to upload a file with Cypress, we don’t click this button, but select the `<input>` element and use `.selectFile()` function on it. This way, instead of interacting with a dialog window to choose a file, we just specify a path to the file we want to to upload. But what if we don’t see the "Choose file" button, but instead we have a upload button or a dropzone area?

## Uploading to a dropzone
Many pages choose to render a slightly nicer UI, where client can just drag and drop a file or click a nicely styled button. This may look something like this:

<v-img alt="Dropzone UI" src="dropzone.png" shadow="shadow-lg"></v-img>


In cases like this, the `<input>` element is often hidden. The interesting bit about this is that the `<input>` element can be found in weird places in the DOM, often away from the dropzone area. This is because the insertion of the file is handled by JavaScript. You can imagine it as if your file gets taken from the dropzone and passed into the `<input>` element where it gets handled.

In my [Trelloapp project](https://github.com/filiphric/trelloapp-vue-vite-ts), the dropzone looks something like this:

<v-img alt="Dropzone DOM" src="dropzone-input.png" shadow="shadow-lg"></v-img>

You’ll see that the the `<input>` element has a style of `display: none` and therefore is hidden from user. To upload a file to this dropzone we can choose one of three strategies:

```js
// input is invisible, so we need to skip Cypress UI checks
cy.get('input[type=file]')
  .selectFile('cypress/fixtures/logo.png', { force: true })

// make our input visible by invoking a jQuery function to it
cy.get('input[type=file]')
  .invoke('show')
  .selectFile('cypress/fixtures/logo.png')

// use Cypress’ abilty to handle dropzones
cy.get('[data-cy=upload-image]')
  .selectFile('cypress/fixtures/logo.png', { action: 'drag-drop' })
```

Notice how in the third example, we are selecting the whole dropzone itself instead of targeting the `<input>` element. This is important, because there’s a difference between how these two strategies are used. If we were to select the wrong element, we might end up with a message like: `cy.selectFile() can only be called on an <input type="file"> or a <label for="fileInput"> pointing to or containing one`. 

## Upload via API
The second part of this story is when our image is sent to the server. Our frontend can handle the image upload in various ways, so there might be some slight differences in how file uploads are handled in your application, but a general idea goes something like this:

```js
cy.fixture('logo.png', 'binary').then( image => {
  const blob = Cypress.Blob.binaryStringToBlob(image, 'image/png');
  const formData = new FormData();
  formData.append('image', blob, 'logo.png');

    cy.request({
      method: 'POST', 
      url: '/api/upload',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
  })
  ```

  Let me break this down now. Our `<input type=file>` element is usually a part of an html `<form>`. Usually, `<form>` element contains multiple `<input>` elements. Before they are sent over to API, they are handled by `FormData` interface. Basically, every piece of data is appended to the `FormData` object and then send to the server using API.

In Cypress, we need to create this `FormData` manually and append our image to it. As you may have noticed, before we `.append()` our image to the `FormData` object, we are handling the image. This happens in two ways:

1. we load our image as a fixture, using `binary` encoding
2. we convert this binary encoded image to Blob

Blob stands for "binary large object" - in other words, we are converting our image to text. This is normally something that is handled by our frontend application. The reason why we need to do this manually in the Cypress test, is because we are avoiding usage of our frontend. In a way, our test is going to behave the same way as our applicatioun would.

Once we handle our file and fill in our `FormData` object, we are ready to call our API. The `body` of our request will be the `FormData` object itself. The only additional detail is to add `'content-type': 'multipart/form-data'` header, so that the server knows we are sending this type of request.

As I mentioned, the final solution for uploading a file via API is going to depend on the API and the application you are testing, but the general idea should be pretty similar to the example given above.

Hope that this helps. If you found this helpful, send it to a friend that might find this helpful. For more tips like this, me on [Twitter](https://twitter.com/filip_hric/), [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/), [YouTube](https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA), or subscribe to my newsletter.