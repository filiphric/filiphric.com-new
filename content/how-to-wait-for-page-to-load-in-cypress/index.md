---
title: "How to wait for page to load in Cypress"
date: 2023-03-15
published: true
slug: "how-to-wait-for-page-to-load-in-cypress"
description: "What if your page takes time to load and your first command fails because of this? In this blogpost I explain how to make sure that your page is fully loaded"
tags: ["cypress","visit","loading"]
image: "pageload_gncwtb.png"
cypressVersion: v10.0.0
---
Cypress test can be pretty fast. Sometimes even faster than the application we are testing. If you find yourself in a situation where Cypress runs faster than you application loads, this blogpost is for you. 

## Page load event
If you found this post via Google search, you might have started your search, because you saw a message that looks like this:

![Page timeout error in Cypress](pageLoadTimeout_error_mxm3ft.png)

This message appears when your page does not trigger the `load` event. But what actually is that?

According to [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event), load event is something that your browser triggers once it is downloading all page assets.

So what does that mean?

Whenever you enter an URL into your browser and hit enter, your browser is going to make a `GET` api call to that address. Similarly to when you do API testing with Postman or with Cypress. Instead of getting a `JSON`-structured object, you are going to get an `HTML` document.

A simplified version of the document that is return will look like this:
```html
<html>
<head>
  <title>My page</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
</head>
<body>
  Hello world!
</body>
</html>
```

Browser will take a look into the document and will request all files linked to it. Notice we have `style.css` and `app.js` files. Browser will download them and once it’s done with this, it will trigger the `load` event that Cypress waits for.

This is pretty much the best point at which we can say that application is ready. Realistically, many sites have dynamic `.js` files that starts calling APIs that load resources from a server, or animate elements on page. These may cause the application to still be in "loading" mode. There’s no telling how many resources these `.js` files will load or how long it will take to load them. While the `load` event is a good checkpoint, in case of modern web applications, it is rarely last thing that happens on a page.

If you see an error that Cypress could not load your page, chances are that this download is not happening, or something is blocking it. This may be an issue on your side, so you can treat this as a bug that needs to be fixed.

>I recently saw the mentioned error happen on [demo site from Sauce labs](https://www.saucedemo.com). The reason for this problem was how service worker was configured. It caused the `load` event to never happen. This is not a problem with all service workers, but it caused some trouble for me. The final solution was to stub the service worker API call, essentially disabling the service worker. I added the following intercept and restarted the browser.
>```ts
>cy.intercept('/service-worker.js', {
>  body: undefined
> })
>```

## Waiting for network calls
Another way of ensuring that a page is loaded is to wait for a network call. For example, when you have a to-do app that will load all the to-dos when it’s opened, you can use a network call intercept that will wait for that network call to happen:

```ts
it('testing todos', () => {
  cy.intercept('/todos').as('todos')
  cy.visit('/')
  cy.wait('@todos')
  // page is loaded, continue with the test
})
```

Since `cy.wait()` will wait for not only the request to happen, but also the response, it can be a reliable way of making sure that your page is properly loaded. 

If you have multiple API calls, you can intercept them all and make your test wait for them by passing an array of aliases to `cy.wait()` command like this:

```ts
it('testing todos', () => {
  cy.intercept('/todos').as('todos')
  cy.intercept('/profile').as('profile')
  cy.visit('/')
  cy.wait(['@todos', '@profile'])
  // page is loaded, continue with the test
})
```

Another way of waiting for multiple requests is to use `cy.get('@alias.all')` syntax. This way you can wait for all requests to happen.
```ts
it('testing todos', () => {
  cy.intercept('**').as('requests')
  cy.visit('/')
  cy.get('@requests.all')
    .should('have.length', 10)
  // all 10 requests have been sent
})
```
There are two small gotchas though. `cy.get()` will wait only for 4000 ms for the request to happen, as it listens to `defaultCommandTimeout` option instead of `responseTimeout` as it does with `cy.wait()`. If your requests take longer to load, you need to change the `timeout` on `cy.get()` command. Also, `cy.get()` will only wait for the request to trigger, but will not actually wait for the response. Cypress’ built-in retry-ability can help us though, because we can check the last request status code by referencing the last request:

```ts
it('testing todos', () => {
  cy.intercept('**').as('requests')
  cy.visit('/')
  // set longer timeout
  cy.get('@requests.all', { timeout: 30000 })
    .should('have.length', 10)
    .its('9.response.statusCode') // check last request
    .should('eq', 200)
})
```

## Waiting for DOM
Another way of making sure that the application is fully loaded is to take a look into the DOM. This way we can actually assure that we don’t end up doing something we would not expect from a real user.

For example, in real world you would probably not interact with an app while there’s still a "loading" animation still overlaid on page. You can add a guard for your test to make sure the loader disappears before you interact with the page.

```ts
it('testing todos', () => {
  cy.visit('/')
  // page loading, wait for loader to disappear
  cy.get('.loader')
    .should('not.exist')

  // continue with our test
})
```

Negative assertions can be a little tricky, and depending on the page speed or way of how the `.loader` animator works, we might want to add `.should('be.visible')` before we assert on the element’s non-existence.

To flip this, we can instead just use `cy.get()` for the element we want to first interact with. If that takes longer time to appear, a `timeout` can be added. You can read more about timeouts and waiting in [one of my previous blogposts](/waiting-in-cypress-and-how-to-avoid-it).

## Default timeout
Sometimes, keeping things simple is the best wait. Every `cy.visit()` will wait for 60 seconds for the `load` event to be fired. This is quite a long time, since real users usually don’t have such patience. If the `cy.visit()` command fails, you should probably fix the application itself and use this timeout as a performance benchmark. Alternatively, you can lower the timeout by changing the `pageLoadTimeout` option in your configuration. Read about different [timeouts in Cypress docs](https://docs.cypress.io/guides/references/configuration#Timeouts).

---

If you read this far, you might be interested in following me on [Twitter](https://twitter.com/filip_hric/), [LinkedIn](http://www.linkedin.com/in/filip-hric), or on [YouTube](https://www.youtube.com/@filip_hric). If you want to be notified about my new blogs and workshops, I recommend subscribing to my newsletter at the bottom of this page.