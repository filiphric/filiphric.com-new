---
title: "Switch between environments in Cypress"
date: 2022-01-24
published: true
slug: "switch-between-environments-in-cypress"
description: "There are multiple ways you can switch to different environments in Cypress. In this blogpost, I explain which ones you can use and show some examples."
tags: ['cypress', 'environment', 'config', 'configuration', 'baseUrl']
---
You probably want to run your tests on mulitple environments. Many times I’ve seen people doing something like this:

```js
cy.visit(Cypress.env('localUrl'))
```

While I am a fan of using `Cypress.env()` for storing values, there are multiple better way you can go around this. 

## Using `baseUrl`

For starters, let’s look at `.visit()` command. This command will open browser with a location you define. But it also takes the `baseUrl` attribute from your `cypress.json`. This means that when you have your `baseUrl` set to `http://localhost:3000`, you can write your urls like this:

```js
cy.visit('/dashboard')
```

and the resolved location will be `http://localhost:3000/dashboard`. The `baseUrl` attribute is used in `.request()` and `.intercept()` commands as well. This is better than using an env variable. For example, you don’t need to deal with renaming everything if you decide one day to change the name of your the `localUrl` env variable.

## Rewriting cypress.json
The easiest way to switch environments is to simply rewrite your `cypress.json` file and set `baseUrl` to a different value each time you want to switch environments. This is of course tedious and takes way too much work if you need to switch often. Also, its not the best way if you use version control and want to run your tests in CI. You need to make a commit every time you want to test against different envrionment and creates mess in your git history.

## Pointing to a different configuration file
Instead of using `cypress.json`, you can point Cypress to a completely different file. Let’s say you have a `production.json` file, where your `baseUrl` attribute is set to your production server. To run Cypress using this file, you can do the following:
```bash
npx cypress open --config-file production.json
```

This of course works for `cypress run` command as well.

## Passing a CLI flag
If you don’t want to change the whole config, you can just change the `baseUrl` attribute by passing it through CLI:
```bash
npx cypress open --baseUrl http://localhost:3000
```

## Writing a plugin
I wrote about this approach in the past, so you can check out a [more detailed article here.](/create-a-configuration-plugin-in-cypress) Basically, as Cypress opens, you can change the config on the fly and rewrite anything in the config. See the following code:
```js [cypress/plugins/index.js]
module.exports = (on, config) => {

  config.baseUrl = 'http://localhost:3000'

  return config

}
```
This will mean that even if you have `baseUrl` set to `https://cypress.io`, when you open Cypress, it will be rewritten to `http://localhost:3000`. If you want to seamlessly switch between environments, you can pass an env variable via CLI and then read it in your plugin. So for example you can write a plugin like this:

```js [cypress/plugins/index.js]
module.exports = (on, config) => {

  if (config.env === 'local') {
    config.baseUrl = 'http://localhost:3000'
  }

  return config

}
```
And then pass this to your CLI:
```bash
npx cypress open --env local
```

As a result, whenever you pass the `local` flag, Cypress will rewrite your `baseUrl` to `http://localhost:3000`. If you pass a different variable, or don’t pass anything, Cypress will take the `baseUrl` from `cypress.json`

## Using Module API
Module API let’s you be very flexible in how you run your tests. When using it, instead of typing `npx cypress run`, you will run your own script. This way, you will type e.g. `node cypress-run.js` to your terminal and create a file that looks something like this:
```js [cypress/cypress-run.js]
const cypress = require('cypress')
cypress.run()
```

The `.run()` function will take an object as an argument. In this object, you can define various properties. The `baseUrl` property will be nested inside `config` object like this:
```js [cypress/cypress-run.js]
const cypress = require('cypress')
cypress.run({
  config: {
    baseUrl: 'http://localhost:3000'
  }
})
```

This enables us to write a function that will resolve our `baseUrl` based on some logic. For example, we can tell Cypress to setup a staging url when running on CI. Most of the CI providers have a `CI` environment variable, which is set to `true` and can be accessed in our `cypress-run.js` file. You can also use an [npm package for this](https://www.npmjs.com/package/is-ci), but it essentially does the same thing. The module api file will now look like this:

```js [cypress/cypress-run.js]
const cypress = require('cypress')
let baseUrl = process.env.CI ? 'http://staging.example.com' : 'http://localhost:3000'

cypress.run({
  config: { baseUrl } // baseUrl will resolve on line 2
})
```
After this, things can get even more complex. You can customize a logic that will resolve your `baseUrl` based on multiple conditions. 

Hope you’ve enjoyed this. You can share or retweet ths blogpost if you feel like it might help someone. If you have questions, you can find me on [Twitter](https://twitter.com/filip_hric/), [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/) or join the [Discord server](https://filiphric.com/discord).
