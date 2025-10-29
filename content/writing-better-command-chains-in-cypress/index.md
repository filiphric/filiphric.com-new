---
title: "Writing better command chains in Cypress"
date: 2022-02-15
published: true
slug: "writing-better-command-chains-in-cypress"
description: "Understanding how command chaining in Cypress works is essential for writing stable tests. In this week’s explainer we’ll take a look on how we can make our tests more stable with writing proper command chains"
cypressVersion: "v11.0.0"
image: 'chains_vecsh4.png'
tags: ['cypress', 'chaining', 'flakiness']
---
If you have been using Cypress, you are probably familiar with command chains. Or are you? I see many Cypress users be aware of them but sometimes slightly miss the underlying logic.

In this post I would like to explore some of the core principles of Cypress chains and how understanding them can make you write your tests better.

## Basics
Cypress commands are written in chains. That’s why when you wan to interact with an element on your page, you need to write two commands:
```js
cy.get('#element').click()
```

There are commands that start a new chain every time they are called. They are often referred to as parent commands. This means that even if they are chained of another command, they would still start a new chain

```js
cy.get('#element') // new chain
  .click()
  .get('#modal') // new chain
  .type('text{enter}')
```

So visually, it seems like we have one long chain here, but in fact, there are two of them.

Since there are parent commands, you might have guessed that there are also some child commands. A typical example of a child command would be `.type()` or `.click()` or `.should()` which need a subject to be applied to. That subject is provided by a previous command - a parent command.

There’s a third category, and that is a dual command, or a hybrid command. This can be both parent or child command, depending on the position in the chain.

```js
cy.get('.button') // parent
  .contains('Send') // parent to .click(), but child to .get()
  .click('#modal') // child()
```

There are some commands that change behavior depending on the position in the chain. For example let’s say we have a following HTML structure with two lists:
```html
<ul id="first-list">
  <li>Apples</li>
  <li>Pears</li>
</ul>
<ul id="second-list">
  <li>Grapes</li>
  <li>Apples</li>
</ul>
```
In this scenario, our `.contains()` command will behave differently based on position in the chain:

```js
cy.contains('Apples') // selects apples in first list

cy.get('.second')
  .contains('Apples') // selects apples in second list
```

## Retries in Cypress
Cypress has retry built in to many of the commands. For example let’s say that we have a list of elements that will take 3 seconds to load. The following command is completely valid and will pass.
```js
cy.get('li')
```
There is a default timeout set to 4000 milliseconds, which you can change in your `cypress.config.js` file. If you are coming from Selenium, you might know this as fluent wait. It is built-in to most of Cypress commands, so there's nothing extra to be added to our tests to make them wait fluently.

Let’s now say, that our lists has 5 elements. They don’t render out immediately, but each one takes about 200 milliseconds to appear in our application.
```js
cy.get('li')
  .should('have.length', 5)
```
This code is also completely valid. That is because `.should()` command will not only repeat itself, but it will make the previous command as well. This means that not only we make sure our assertion passes, but Cypress will run our `.get()` command as many times needed (within the upper limit) to satisfy our assertion.

## Common gotcha
However, when we make a longer chain of commands, this is when it gets a little tricky. our `.should()` command will only make our previous command retry. This means that if we have a longer chain like this, we might run into a problem:

```js
cy.get('li')
  .eq(0)
  .should('contain.text', 'Apples')
```
While there is nothing entirely wrong with writing our test like this, it opens door to some flakiness. If all of our `<ul>` and `<li>` elements will get rendered at the same time, we are safe. But if they load one by one, we run into a problem. Our `.get()` command will not select the element we want. Let’s look at the HTML structure again:

```html
<ul id="first-list"> // this list loads second
  <li>Apples</li> 
  <li>Pears</li> 
</ul>
<ul id="second-list"> // this list loads first
  <li>Grapes</li> 
  <li>Apples</li> 
</ul>
```
Our `.should()` command will try to search for the `Apples` text on the wrong element. Let’s break down what happens.

1. Our app opens and starts loading our lists
2. `.get()` command is mand for any `<li>` elements it can find
3. Our app will load `<ul id="second-list"> ` while our first list is still loading
4. Immediately, `.get()` command find our `<li>` elements in the second list and pass them on to `.eq()` command
5. `.eq(0)` command will filter out our first element in the list, containing the text `Grapes`
6. `.should()` command will determine whether it contains the text `Apples`. It does not, so it makes the previous command run again
7. But our `.eq()` command will just perform the exact same action again, because it was passed elements from `<ul id="second-list">`
8. Our `.get()` command will never get called again, so even when our `<ul id="first-list">` eventually gets rendered, our `.eq()` and `.should()` commands will not reach it


To improve this, we can leave out the `.eq(0)` command, so that our assertion will make the `.get()` command try again until there is at least *some* element that contains our text.

```js
cy.get('li')
  .should('contain.text', 'Apples')
```
If this is not sufficient, we can first make sure that the number of our `<li>` elements is correct, and then make our assertion:
```js
cy.get('li')
  .should('have.length', 4)
  .eq(0)
  .should('contain.text', 'Apples')
```
This works, because every Cypress command will wait for the previous command to finish. This way, our `.eq(0)` command will run only when we have all of our four `<li>` elements present on page and not sooner.

## Writing better command chains
Knowing this, you can write your command chains more effectively. Since we know that:

1. every commands waits for the previous to finish
2. commands pass information from one to another
3. `.should()` makes previous command retry

We can prevent flakiness and make our commands stable. Let’s say we have a search box that will render our elements from API. Writing a test like this might be flaky, because as we write our search phrase, API requests are being fired on every letter stroke and response takes a couple of seconds to render in app (this or course depends on the implementation in the app but this practice is not uncommon).

```js
cy.get('#search').type('Apples')
cy.get('.result').contains('Apples').click()
```

Looking at this example, you know why this may be flaky. Our `.result` item might get re-rendered with new text as our API responses arrive. This may result in `Element detached from DOM` error that you might have encountered. To make this test more stable, you can write it like this:

```js
cy.get('#search').type('Apples')
cy.contains('.result', 'Apples').click()
```

This way we click the result that we were searching for even if there’s a delay between entering the search query and showing results.

Hope this helps. If you feel like this post may help someone or has helped you, feel free to share it on social networks, it really helps. You can also follow me on [Twitter](https://twitter.com/filip_hric/) or on [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/). See ya!
