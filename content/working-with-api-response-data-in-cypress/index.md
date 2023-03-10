---
slug: working-with-api-response-data-in-cypress
date: 2020-11-30
title: 'Working with API response data in Cypress'
published: true
description: 'In this post, I’m showcasing different ways to handle data generated by server and use them in your tests.'
tags: ['network', 'cypress', 'api', 'testing']
---
>TL;DR: Your Cypress code is executed in blocks. To work with data from, you can use `.then()` command, mocha aliases, window object or environment variables. I have created a pattern using environment variables, which I’m showing in second part of this blog. My app, as well as this pattern [can be found on GitHub](https://github.com/filiphric/trelloapp). To discuss, [join community Discord server](https://bit.ly/cy-discord), or see it in action [on my YouTube](https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA).

Situation goes like this. At the beginning of your test, you call an API endpoint. It will give you a response, which you want to use later in your test. What do you do?

The obvious temptation is to store your response in a variable, something like this:
```js
beforeEach( () => {

  cy
    .log('starting test')

})

it('creates a new board', () => {

  let res
  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then( ({ body }) => {
      res = body
    })

  console.log(res)

})
```
This will not work properly though. The `console.log` will return `undefined`. The main reason for this is that [Cypress commands are asynchronous](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Asynchronous). But what does that mean in simple terms?

## Understanding how Cypress code is run
The intuition is, that our code reads from top to bottom. This is partially true, but not entirely. It is actually ran in blocks. In our test, there are three separate blocks of code (or functions). Our `beforeEach()` block, `it()` block and `.then()` block. This means that when our code is running will first run this block:
```js {1-6}
beforeEach( () => {

  cy
    .log('starting test')

})

it('creates a new board', () => {

  let res
  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then( ({ body }) => {
      res = body
    })

  console.log(res)

})
```
Then it will run this part (take a look at what happens with the `res` variable):
```js {8-13,17-20}
beforeEach( () => {

  cy
    .log('starting test')

})

it('creates a new board', () => {

  let res

  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then( ({ body }) => {
      res = body
    })

  console.log(res)

})
```
And finally this part:
```js {13-15}
beforeEach( () => {

  cy
    .log('starting test')

})

it('creates a new board', () => {

  let res
  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then( ({ body }) => {
      res = body
    })

  console.log(res)

})
```
This demonstrates why our `console.log()` is not returning the value that we want.

## Using .then() command
If we want to work with what our `.request()` command returns, then we need to write that code inside `.then()` function. So if we want to create a new list inside a board, we need to write a code like this:
```js
it('creates a new list within a board', () => {

  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then((board) => {

      cy
        .request('POST', '/api/lists', {
          title: 'new list',
          boardId: board.body.id
        })

    })

})

```
This can of course lead to what is known as callback hell. Let’s say we want to create **task**, that is inside a **list**, which is on a **board**. The code would look something like this:
```js
it('creates a new task on a list within a board', () => {

  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then((board) => {

      cy
        .request('POST', '/api/lists', {
          title: 'new list',
          boardId: board.body.id
        })
        .then((list) => {

          cy
            .request('POST', '/api/tasks', {
              title: 'new task',
              listId: list.body.id,
              boardId: board.body.id
            })

        })

    })

})
```
## Using aliases
You can already see how the code above is becoming harder to read. One way we can the avoid callback hell in Cypress is using [Mocha aliases](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Sharing-Context). This enables us to store data and access them during our test. This helps us shift everything basically to the same level:
```js {1}
it('creates a new task on a list within a board', function() {

  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .as('board')

  cy
    .then(() => {

      cy
        .request('POST', '/api/lists', {
          title: 'new list',
          boardId: this.board.body.id
        })
        .as('list')

    })

  cy
    .then(() => {

      cy
        .request('POST', '/api/tasks', {
          title: 'new task',
          listId: this.list.body.id,
          boardId: this.board.body.id
        })

    })

})
```
However, notice on line 1, that instead of arrow function, we are using regular function syntax. This is because it is not possible to use `this` keyword with arrow functions.

## Window object
Another way how you can pass data is using your browser’s window object. What this enables you to do is to share data between tests:
```js
it('creates a board', () => {

  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then((board) => {
      window.board = board.body;
    })

})

it('creates a list', () => {

  cy
    .request('POST', '/api/lists', {
      title: 'new list',
      boardId: window.board.id
    })

});
```
 I would not entirely recommend this approach, but it’s out there. The reason I’m not recommending it is that you should try to avoid your tests from being dependent on each other. If first test fails here, it automatically makes the other test fail too, even though it might theoretically pass. However, using window context might help when you try to collect data from your whole spec and then use it in `after()` hook.

 ## Using environment
 This approach is similar to what is often done in [Postman](https://www.postman.com/). With Postman, you often use environment to store data from requests. I personally use `Cypress.env()` to store any data that my server returns. In short, using it looks like this:
 ```js
  cy
    .request('POST', '/api/boards', { name: 'new board' })
    .then(({ body }) => {

      Cypress.env('board', body)

    })
```
So far it does not look too different from everything else. To leverage `Cypress.env()` I actually do a couple of more things. Here are the steps:
1. Create storage space in `support/index.ts` file
2. Create custom command for API calls
3. Add types for custom commands
4. Add types for storage

## Creating a storage
The inspiration for creating a „data storage“ came from when I was creating my [Trello clone app](https://github.com/filiphric/trelloapp). This app is built in Vue, which uses data object, where all your app data is stored. Data can be read or retrieved, but the main point here is that you have a single storage. In this storage, you define where your data should be placed. So all **boards** are stored in **boards** array, **lists** are in **lists** array, etc. To define storage for my app, I create a `beforeEach()` hook in my `support/index.ts` file and define attributes my `Cypress.env()` and their initial values:
```js [support/index.js]
beforeEach(() => {

  Cypress.env('boards', []);
  Cypress.env('lists', []);

});
```
## Creating a custom command for API calls
Next, I’ll add my request as a custom command:
```js {7} [support/commands/addBoardApi.ts]

Cypress.Commands.add('addBoardApi', (name) => {

  cy
    .request('POST', '/api/boards', { name })
    .then(({ body }) => {

      Cypress.env('boards').push(body)

    })

})
```
Now, whenever I call my custom command, the response of my request is going to be saved into `boards` array. Whenever I need to access this storage, I can just use it in my code like this:
```js
Cypress.env('boards')[0].id
```
This will effectively access my board id. This does not entirely solve the problem of callback hell however, since I will not be able to access my board id just like this:
```js
it('creates a list', () => {

  cy
    .addBoardApi('new board')

  cy
    .request('POST', '/api/lists', { title: 'new list', boardId: Cypress.env('boards')[0].id })

});
```
This will throw an error, because our `Cypress.env('boards')[0].id` will still be `undefined`. But using a custom command is similar to using `.then()` function. So we can write a custom command for our second request as well. Since we now have a storage, we can use it and look into our storage for the proper uuid:
```js
Cypress.Commands.add('addListApi', ({ title, boardIndex = 0 }) => {

  cy
    .request('POST', '/api/lists', {
      boardId: Cypress.env('boards')[boardIndex].id,
      title,
    }).then(({ body }) => {
      Cypress.env('lists').push(body);
    });

});
```
This way, we can reference our board using index. We can create two boards in our test and add a list just inside the second one.
```js {6}
it('creates a list', () => {

  cy
    .addBoardApi('first board')
    .addBoardApi('second board')
    .addListApi({ title: 'new list', boardIndex: 1})

});
```
This will create a **list** in our **second board**. Our custom `.addListApi()` command defaults `boardIndex` option to `0`, we don’t even have to add this option if we are just creating a single board. Compared to all the `.then()` functions, this is much easier to read.

## Add types for custom commands
You may have already noticed that I’m using TypeScript for most of my tests. I suggest you [check out the documentation on TypeScript](https://docs.cypress.io/guides/tooling/typescript-support.html#Install-TypeScript) to get yourself up and running. One cool perk of using TypeScript is that you add your command type definition really easily. This enables Intellisense autocomplete and helps anyone who will use your custom commands in the future. To add these, I create a `commands.d.ts` file.
```ts [support/@types/commands.d.ts]
declare namespace Cypress {
  interface Chainable {
    /**
     * creates a new board via API
    */
    addBoardApi(name: string): Chainable<Element>

    /**
     * Adds new list via API
    */
    addListApi(options: {
      title: string;
      boardIndex?: string;
    }): Chainable<Element>

  }
}
```

## Add types for storage
As a final touch I’m adding a code that my colleague put together for me. This enables me to add our own environment keys which will pop up whenever I reference one of my storage items in `Cypress.env()`. This code basically expands types for `Cypress.env()` function
```ts [support/@types/env.d.ts]
export { };

declare global {
  namespace Cypress {

    export interface Cypress {

      /**
       * Returns all environment variables set with CYPRESS_ prefix or in "env" object in "cypress.json"
       *
       * @see https://on.cypress.io/env
       */
      env(): Partial<EnvKeys>;
      /**
       * Returns specific environment variable or undefined
       * @see https://on.cypress.io/env
       * @example
       *    // cypress.json
       *    { "env": { "foo": "bar" } }
       *    Cypress.env("foo") // => bar
       */
      env<T extends keyof EnvKeys>(key: T): EnvKeys[T];
      /**
       * Set value for a variable.
       * Any value you change will be permanently changed for the remainder of your tests.
       * @see https://on.cypress.io/env
       * @example
       *    Cypress.env("host", "http://server.dev.local")
       */
      env<T extends keyof EnvKeys>(key: T, value: EnvKeys[T]): void;

      /**
       * Set values for multiple variables at once. Values are merged with existing values.
       * @see https://on.cypress.io/env
       * @example
       *    Cypress.env({ host: "http://server.dev.local", foo: "foo" })
       */
      env(object: Partial<EnvKeys>): void;

    }

  }
}

interface EnvKeys {
  'boards': Array<{
    created: string;
    id: number;
    name: string;
    starred: boolean;
    user: number;
  }>;
  'lists': Array<{
    boardId: number
    title: string
    id: number
    created: string
  }>;
}
```

## Putting it all together
This pattern effectively creates a testing library, where all API endpoints have a custom command and responses are stored in my `Cypress.env()` storage. I end up writing a test that looks something like this:
```js
beforeEach(() => {

    cy
      .addBoardApi('hello board')
      .addListApi({ title: 'hello list' });

  });

  it('create a task', () => {

    cy
      .visit(`/board/${Cypress.env('boards')[0].id}`);

    cy
      .get('.List_addTask')
      .click();

    cy
      .get('.ListContainer .TextArea')
      .should('be.visible')
      .type('new task{enter}');

    cy
      .get('.Task')
      .should('be.visible');

  });
  ```
  I prepare my test state in `beforeEach()` hook, and to the rest in my `it()` block. This helps me getting a clear idea on what is happening before my test as well as inside my test. I would probably create a custom command for my `.visit()` as well since opening my board would be a very frequent action in which I need my board id. But that’s a story for another time.

  You can check this code out on [my Trello clone app](https://github.com/filiphric/trelloapp) or you can [join me on my YouTube channel](https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA) to see how I work with this pattern. If you have any comments, suggestions, or just want to chat, feel free to [join my Discord channel](https://bit.ly/cy-discord). See you there!
