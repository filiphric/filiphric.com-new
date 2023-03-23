---
title: "Cypress basics: Variables"
date: 2021-12-07
published: true
slug: "cypress-basics-variables"
description: "How to store variables in Cypress tests and use variables and aliases inside the test and between tests."
tags: ['cypress', 'variables', 'basics']
image: variables_o9j7mz.png
---
>This article is a part of series on Cypress basics. You can check out some other articles on my blog where I provide step by step explanations of some Cypress basics + some extra tips on how you can take things one step further. So far, I wrote about:
> :BasicsToc

If you came here via Google search, you are probably wondering why code like this does not work in Cypress:
```js
it('stores value in variable', () => {

  let id

  cy.request('/api/boards')
    .then( res => {

      id = res.body[0].id
    })

  cy.visit('/board/' + id) // "id" is undefined?!

})
```

If you are here just for the solution, scroll down to the section named **Possible solutions** If you want to understand what is going on, read on.

So why is `id` undefined? When you dig into docs, it might get a little confusing. There’s article about [how commands in Cypress are asynchronous](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous), then maybe read a little bit about [how you should handle variables](https://docs.cypress.io/guides/core-concepts/variables-and-aliases), you’ll try `async/await`, but then find out [that does not work either](https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-use-the-new-ES7-async-await-syntax). So what is going on?

Let’s add a couple of `console.log()` functions to our test and see how will the test behave. Just by looking at the code, can you guess what will be printed out in browser console?
```js {2,7,11}
it('stores value in variable', () => {
  console.log('>>> first log')
  let id

  cy.request('/api/boards')
    .then( res => {
      console.log('>>> second log')

      id = res.body[0].id
    })
  console.log('>>> third log')

  cy.visit('/board/' + id)
})
```

Maybe you guessed it right. But I guess you are curious why is this the answer:

```
>>> first log
>>> third log
>>> second log
```

As I said earlier, the answer *is* in the docs, but it might be a little confusing. At least for me it was. So here’s another way to think about it.

## Cypress chain vs. everything else
**Cypress commands run in a chain**. Each chain link ties to the one before and is also tied to the one after. This way Cypress ensures that you don’t run into race conditions and will automatically wait for the previous command to finish. Let me give you an example.

```js
cy
  .get('li')
  .should('have.length', 5) // wait until previous command finds elements
  .last() // wait until previous assertion passes
  .click() // wait until previous command finishes
```

Again, no command will run until the one before is finished. If any of the commands don’t finish on time, (usually 4 seconds) test fails. 

**So what happens with the code that is outside the chain?** Well, since it’s not part of the chain, there’s nothing that forces it to wait, and gets **executed immediately**. 

Let’s now look at the example with a fresh perspective.

```js {2,3,8,9,13,14}
it('stores value in variable', () => {
  // outside of chain, run immediately
  console.log('>>> first log') 
  let id

  cy.request('/api/boards')
    .then( res => {
      // inside the chain, wait for .request to finish
      console.log('>>> second log') 
      id = res.body[0].id
    })

  // outside of chain, run immediately
  console.log('>>> third log') 

  cy.visit('/board/' + id)
})
```

Hopefully, the `console.log()` functions make a little more sense now. But what about that `id` variable? It seems like being used inside the chain. Or is it? 

Actually not. It is passed as an argument, so technically it is not inside the command chain, but passed "from outside". We declared this variable at the beginning of the test. Within our test, we are telling Cypress that we want to execute `.visit()` command with whatever `'/board/' + id` is.

It starts to make a little more sense when we take a closer look into our "inside chain vs. outside chain" principle. Let’s take a look at the code again:

```js
it('stores value in variable', () => {
  // not waiting to declare the variable
  let id

  cy.request('/api/boards')
    .then( res => {
      // waiting for .request to happen in test, then assign new value
      id = res.body[0].id
    })

  // not waiting to pass the variable
  cy.visit('/board/' + id)
})
```

Now that the problem is clearer, let’s look at how we can pass values around in our test using different methods. There are many solutions to this, so let’s look at at least a few.

## Possible solutions

### Solution #1: Move the desired code inside command chain

The easiest solution is to make sure that anything we include everything in our command chain. To use the new value, we need to call our `.visit()` function inside the command chain. That way, the `id` will be passed with a new value. Of course, multiple `.then()` funcitons can potentially cause a "pyramid of doom", so this solution is best for cases when you want to immediately pass a single variable.


```js
it('stores value in variable', () => {
let id // create variable

cy.request('/api/boards')
  .then( res => {
    id = res.body[0].id // assign value
    cy.visit('/board/' + id) // pass the newly assigned value
  })

})
```

### Solution #2: Split logic into multiple tests
Since Cypress runs `it()` blocks one by one, you can split the logic into multiple tests and use a "setup" `it()` function for assigning your variables and then execution `it()` block to use that variable. However, this approach might be quite limiting, as you need a separate block for every variable change. **It’s also not the best test design**, as not every `it()` function is now a test. This can also create a weird domino effect, where a failure of a test can be caused by a previous test.


```js
let id // declare variable

it('assign new value', () => {
  cy.request('/api/boards')
    .then( res => {
      id = res.body[0].id 
    })
})

it('use variable', () => {
  cy.visit('/board/' + id) 
})
```


### Solution #3: Use hooks
A slightly better way to split a test is to use `before()` or `beforeEach()` hooks. This way you are splitting your test in a more logical way. You have a preparation phase, which is not part of the test, and an execution phase, which is the test itself. Another advantage of this approach is that when a hook fails, you’ll get a clear information about this in the error log.
```js
let id // declare variable

beforeEach( () => {
  cy.request('/api/boards')
    .then( res => {
    id = res.body[0].id 
  })
})

it('use variable', () => {
  cy.visit('/board/' + id) 
})
```

### Solution #4: Use aliases
We can skip creating a variable altogether and use aliases instead. They are not that different from variables, but they live directly in the context of our test. The advantage of this approach is that we don’t need to use the alias right away, but we can use it later in our test.

```js
it('use alias', () => {

  cy.request('/api/boards')
    .as('board') // create alias
  
  // some more code
  // ...

  cy.get('@board') // use alias
    .its('body')
    .then( body => {
    
      cy.visit('/board/' + body[0].id)

    })

})
```

### Solution #5: Use aliases and hooks
Aliases are actually part of Mocha - a framework that is bundled within Cypress and is used for executing tests. Whenever you use `.as()` command, it will create the alias within Mocha context which can be accessed by using `this` keyword as shown in example. It will be a common variable, so you can share variables between tests in the spec. However, `this` keyword cannot be used in functions with arrow expression `() => {}`, but needs to be used with traditional function expression, `function() {}`. See the example

```js
beforeEach( () => {
  cy.request('/api/boards')
    .as('board')
})

// using  it('use variable', () => { ... would not work 
it('use variable', function() {
  cy.visit('/board/' + this.board.body[0].id) 
})
```

There are a couple of more examples that can help you with storing variables in Cypress, these are just a few of them. I shared some more advanced examples in my older blog on how to handle data from API, [you can check it out here.](/working-with-api-response-data-in-cypress)
