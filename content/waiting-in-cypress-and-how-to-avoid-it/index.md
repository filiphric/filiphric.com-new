---
title: "Waiting in Cypress and how to avoid it"
date: 2022-01-10
published: true
slug: "waiting-in-cypress-and-how-to-avoid-it"
description: "Adding a wait to your test is something people like to avoid. Luckily, with Cypress, there are several ways of how to avoid waiting for a static period of time and simply move a test forward once the application is in a state we desire."
tags: ['cypress']
---
There are many perfectionists among testers. Almost everyone I have met has this itch when they use the `.wait()` command in Cypress and halt the test for a couple of seconds. If this applies to you as well, then you know well that using `.wait()` like this is not exactly the best solution and try to look for an alternative. The test simply does nothing for a couple of seconds. Those couple of seconds may be enough. But sometimes, the wait is not long enough.

Whenever we use `.wait()`, we want our application to reach the desired state. Modal closes, network response comes back in, button changes state, etc. Cypress was built with retrybility in mind - which means that as soon as a command passes, it will move on to the next one. If it’s not passing, Cypress will keep retrying for a couple of seconds. 

This architecture often causes that Cypress often moves *too fast* through our application, and we want to make it wait. Reaching for a hard wait is often a way to tell Cypress to slow down. But it’s not ideal, as I already mentioned. So let’s look at a couple of things you can do when you face the dreaded solution.

## Just use the wait and be done with it
I know, I know. The heading of this article promises a guide on how to avoid this, but hear me out. Sometimes, the best solution for you and the rest of the team is just using the hard wait. Don’t spend two days finding the right combination of guards, assertions, intercepts and whatnot to avoid using the `.wait()` command. Those two days are probably exceeding the total waiting time that the test would create. More importantly, your time is much more valuable than the one on CI/CD pipeline. You could be working on something more useful. Perfectionism is expensive. Just add the wait, move on, and come back later. It’s also a good practice to leave a "to do" comment so that anyone that encounters this will get an understanding of why is there a wait in this test.

```js
  // TODO: ugh, have to use wait. button does not get interactive soon enough
  cy.get('button')
    .wait(2000) 
    .click()
```

**PRO TIP:** you can use [eslint-plugin-cypress](https://www.npmjs.com/package/eslint-plugin-cypress) to get lint warning every time you use `.wait()` in your test.

## Use "defaultCommandTimeout" to change default timeout
Every element you query for an element using `.get()` `.contains()` or some other command, it will have a default wait time of 4 seconds. Cypress will wait for the element to appear in DOM and will retry while it can. If 4 seconds are not enough, you can set the time up globally for your project in the `cypress.json` file to make Cypress wait longer:
```json [cypress.json]
{
  "defaultCommandTimeout": 5000
}
```
Setting this timeout has one important side effect. Your tests will fail slower. This may prolong the feedback loop for you, so you might want to reach for a less harsh solution.

Let’s say you have a single test where some elements load slightly slower. Instead of applying the longer timeout globally, you can just apply this configuration in a single test.

```js
it('slow test', { defaultCommandTimeout: 5000 },  () => {

  // will wait 5 seconds for element to appear in dom
  cy.get('slowElement')

})
```

This configuration object works for `describe` blocks as well:
```js
describe('slow tests', { defaultCommandTimeout: 5000 },  () => {

  it('slow test #1', () => {
    // will apply 5 timeout
  })

  it('slow test #2', () => {
    // here too
  })

})

it('not so slow test', () => {
  // but not here
})
```

## Use timeout per command
Prolonging the timeout for the whole test might not always be the best way. Sometimes, you simply want to wait until a certain element appears, but everything else on the page is pretty fast. For these cases, you can use the options object and change timeout for a certain command.
```js
cy.get('#myElement', { timeout: 10000 })
  .should('be.visible')
```
Notice how we are adding the `timeout` into our `.get()` command, not the `.should()`. The intuitive approach might be to wait for the element to pass our assertion. But our assertion is tied to the querying of the element. That’s why if an assertion is not fulfilled, it [will make the previous command retry as well](https://docs.cypress.io/guides/core-concepts/retry-ability#Only-the-last-command-is-retried).

This can also be useful if you want to wait for the element to disappear or be removed from the DOM before you move on to the next step of your test.

```js
cy.get('#modal', { timeout: 10000 })
  .should('not.exist')

// continue with the test
```
Side note: Be mindful of the difference between `not.exist` and `not.be.visible`. I sometimes see people confuse these two and a for good reason. Intuitively, they feel like the same thing. But while `not.exist` will check for absence of the element in DOM, `not.be.visible` will only pass if the element is present in DOM, but it is not visible.

## Wait for page load
I’ve talked about [checking links](/testing-links-with-cypress) in the past and why clicking individual links might not be the best solution. But if a page redirect is part of your test flow, you might want to wait a second for the test to continue. Instead of using the wait command, you can use the same principle as in the previous example.

```js
cy.get('#redirectLink')
  .click()

cy.location('pathname', { timeout: 10000 })
  .should('eq', '/about')
```

## Wait for API response
Cypress works great with http requests. If you are waiting for some resources to be loaded in your app, you can intercept a request and then create an alias for it. That alias will then be used with `.wait()` command. Test will only continue once that command is finished.
```js
cy.intercept('/api/boards').as('boardList')
cy.visit('/')
cy.wait('@boardList')
// continue with test after response happens
```
Finding the right request to intercept is a great way to make sure that Cypress will wait until page loads with all the right data loaded.

If you need to wait for multiple requests, you can set up a multiple alias wait in a single command:

```js
cy.intercept('/api/boards').as('boardList')
cy.intercept('/api/cards').as('cardList')
cy.visit('/')
cy.wait(['@boardList', '@cardList'])
// continue with test after all responses happen
```

One important notice here - if you want to change the default timeout for api responses, you need to work with `responseTimeout` config option.

## Wait for anything
You can wait for basically anything by passing a callback function into `.should()` command. It will use the built in retry logic and wait for the function to pass. For example, you can wait until all of the elements on page have the proper text. This example shows how we can wait for a list to be reordered instead of waiting for a second.
```js
cy.contains('button', 'Sort alphabetically')
  .click()

// list is reordering, it will take a while

cy.get('.list')
  .should( (items) => {

    // but no worries, we will retry until these pass or until timeout
    expect(items).to.have.length(2)
    expect(items[0]).to.have.text('Apples')
    expect(items[1]).to.have.text('Bananas')

  })

// all is good, continue with our test
```

These can be applied for anything, for example here we check if input has a proper value and a class:

```js
cy.get('input')
  .should( (email) => {

    expect(email).to.have.value('hello@example.com')
    expect(email).to.have.class('valid')

  })
```

Hope you liked this. You can help me spread the word and share this post with your friends if you feel like I deserved it. Make sure to follow me on [Twitter](https://twitter.com/filip_hric/) or [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/).
