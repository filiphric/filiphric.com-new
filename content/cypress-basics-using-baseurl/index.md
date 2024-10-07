---
title: "Cypress basics: Using baseUrl"
date: 2023-04-05
published: true
slug: "cypress-basics-using-baseurl"
description: "Setting up `baseUrl` helps you write your test in a way that enables running them against multiple environments. This is vital to make your tests available for multiple versions of your app."
tags: ["cypress","baseurl","visit","config"]
image: base_kdb9xo.png
cypressVersion: v10.0.0
---
>This article is a part of series on Cypress basics. You can check out some other articles on my blog where I provide step by step explanations of some Cypress basics + some extra tips on how you can take things one step further. So far, I wrote about:
> :BasicsToc

Cypress is built for testing *your* application. In other words, it was designed to be able to test an application that you have access to, and are actively developing. For this reason, Cypress comes with a `baseUrl` parameter which can help you set up the starting point of your testing efforts. In this blogpost we will take a look into what `baseUrl` is and how you can use it.

## Setting up the baseUrl in Cypress Configuration

The first step in using the `baseUrl` in Cypress is to configure it in your `cypress.config.js` file. This file is located at the root of your Cypress project and contains various configuration options for your tests. The configuration will look something like this:

```js [cypress.config.js]
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://example.com'
  },
})
```

You should replace `https://example.com` with the actual URL of your web application. This can be a `localhost` address if you are testing locally, staging website or a production site. This configuration makes the specified URL available as the `baseUrl` throughout your test suite.

## Accessing the `baseUrl` in tests
Once you have set up the `baseUrl` in your configuration, you can access it different ways. For example, your `cy.visit()`, `cy.request()` and `cy.intercept()` commands will use this `baseUrl`, so instead of typing out the whole url, you only use the path.

```js
cy.visit('/home') 
// resolves to https://example.com/home

cy.request('/api/items') 
// resolves to https://example.com/api/items

cy.intercept('/api/logout') 
// resolves to https://example.com/api/logout
```

> 💡 Did you know, that instead of visiting a URL, you can open a plain html file? Just use `cy.visit('index.html')` to open `index.html` file in your root folder of your project.

## Changing the `baseUrl` During Test Execution
In some cases, you may need to change the `baseUrl` at a test level. This might be the case for some smoke tests that are intended to cover a larger system, consisting of applications split into multiple domains. To set up a different `baseUrl` on a test, you can use test configuration object:

```js
describe('smoke tests', () => {
  it('test default domain', () => {
    cy.visit('/home')
    // will go to https://example.com/home
  })

  it('test some other domain', { baseUrl: 'https://other.com '}, () => {
    cy.visit('/home')
    // will go to https://other.com/home
  })
})
```

## Making Assertions with `baseUrl`
In your tests, you may want to make assertions that involve the `baseUrl`. For example, you may want to ensure that your application redirects to the correct page after a certain action.

Here's an example of how to make assertions with the `baseUrl`:

```js
describe('Redirect Test', () => {
  it('Redirects to the login page after signing out', () => {
    const baseUrl = Cypress.config('baseUrl');
    // Perform the sign-out action
    cy.get('#sign-out-button').click(); 
    // Assert that the user is redirected to the login page
    cy.url().should('eq', `${baseUrl}/login`);
  });
});
```

## Passing `baseUrl` through CLI
You actually don’t need to set up your `baseUrl` in the `cypress.config.js` file at all. Instead, it is possible to resolve it when opening Cypress:

```sh
npx cypress open --config baseUrl=https://staging.example.com
```

This way you can easily switch between different environments and open Cypress against the one you want to test in

## Resolving `baseUrl` dynamically
You can take things one level further and resolve your `baseUrl` dynamically. You can either do this on the parameter itself, or by using `setupNodeEvents()` function. Let’s take a look at the examples.

```js [cypress.config.js]
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: process.env.CI ? "https://staging.example.com" : "http://localhost:3000"
  },
})
```

In this example, we’ll set up the location `https://staging.example.com` whenever we run tests on a CI pipeline. Most of CI sercives set up a `CI=1` variable, which we can use for making the decision. We are adding a condition that will set up `https://staging.example.com` if we are in a CI environment and `http://localhost:3000` if we are not.

If we need to switch between multiple URLs, we can use `setupNodeEvents()` function:

```js [cypress.config.js]
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      const version = config.env.VERSION || 'local'

      const urls = {
        local: "http://localhost:3000",
        staging: "https://staging.example.com",
        prod: "https://example.com"
      }

      // choosing version from urls object
      config.baseUrl = urls[version]

      return config
    },
  },
})
```

We can now easily switch between different URLs by passing the name of the application version to the `--env` flag:

```bash
# will use http://localhost:3000
npx cypress open --env version="local"
# will use http://staging.example.com
npx cypress open --env version="staging"
# will use http://example.com
npx cypress open --env version="prod"
# will use fallback to http://localhost:3000
npx cypress open 
```

## Best practices using `baseUrl`
A common error that I see people doing is using the `baseUrl` like this:

```js [❌ don’t use]
cy.visit(Cypress.config('baseUrl') + '/home')
```
As shown in the example at the beginning of this post, this serves no purpose and adds redundancy to your tests.

Setting up `baseUrl` helps you write your test in a way that enables running them agains any environment. This is vital to make your tests flexible.