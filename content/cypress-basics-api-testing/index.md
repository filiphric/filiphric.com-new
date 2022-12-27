---
title: "Cypress basics: API testing"
date: 2022-01-17
published: true
slug: "cypress-basics-api-testing"
description: "Cypress is a great testing tool that can be also very helpful when testing API. In this post, I’ll go over some basics on how to write an API test in Cypress."
tags: ['cypress', 'api', 'request']
---
If you have ever tested API via Postman or some other tool, this one will be a piece of cake for you. Cypress is a great testing tool that can be also very helpful when testing API. In today’s post, I’ll go over some basics on how to write an API test in Cypress.

This article is a part of series on Cypress basics. You can check out some other articles on my blog where I provide step by step explanations of some Cypress basics + some extra tips on how you can take things one step further. So far, I wrote about:

- [Selecting elements](/cypress-basics-selecting-elements)
- [Where did my cookies disappear?](/cypress-basics-where-did-my-cookies-disappear)
- [Check if element exists](/cypress-basics-check-if-element-exists)
- [before(), beforeEach(), after() and afterEach()](/cypress-basics-before-beforeeach-after-aftereach)
- [Check attributes, value and text](/cypress-basics-check-attributes-value-and-text)
- [xpath vs. CSS selectors](/cypress-basics-xpath-vs-css-selectors)
- [Variables](/cypress-basics-variables)
- [Uploading a file](/cypress-basics-uploading-file)

## .request() command
This command will be the center of it all. To send a simple request with a `GET` method, you can call it like this:

```js
cy.request('/api/boards')
```

Notice you don’t really need to add the method. Cypress optimizes their commands for maximum readability, so if you write a request like this, it will automatically be one with a method of `GET`. 

If you pass two arguments into `.request()` command, the first argument will be considered a method, and the second one will be a url.

```js
cy.request('DELETE', '/api/boards/9873789121')
```

Also, I haven’t specified a full url. That is because the `/api/boards` will be automatically appended to anything that is defined as `baseUrl` in `cypress.json`

`.request()` command can take maximum of 3 arguments. The third one will be a request body. 

```js
cy.request('POST', '/api/boards', {
  name: 'space travel plan'
})
```
This simple syntax is super useful, when you want to send a bunch of requests to your database to quickly setup your data for your UI test. My friend Furbo has written a [great blogpost about this](https://code.kiwi.com/skip-the-ui-using-api-calls-d358b9b61b91?gi=d56b0341034d). 

## Passing multiple attributes to .request() command
If you want to pass some more options or just provide your `.request` command a little more context, you can pass a single object. The same request from previous example can be written like this:

```js
cy.request({
  method: 'POST', 
  url: '/api/boards', 
  body: {
    name: 'space travel plan'
  }
})
```

This also gives you the ability to pass more options, for example headers or query parameters:

```js
cy.request({
  method: 'GET', 
  url: '/api/boards', 
  qs: {
    starred: 'true'
  },
  headers: {
    accept: 'application/json'
  }
})
```
## Getting data from request
After a request receives a response from server, you can access the information using `.then()` command. This will return all kinds of attributes like response body, status code, duration etc.
```js
cy.request({
  method: 'POST', 
  url: '/api/boards', 
  body: {
    name: 'space travel plan'
  }
}).then( (board) => {

  console.log(board.status) // 201
  console.log(board.duration) // 11
  console.log(board.body) 
/* 
  { 
    "name": "new board",
    "id": 39871447524,
    "starred": false,
    "created": "2022-01-17"
  }
*/
})
```

The alias `board` used as a parameter in our `.then()` function can actually be skipped, if you use destructuring.
```js
cy.request({
  method: 'POST', 
  url: '/api/boards', 
  body: {
    name: 'space travel plan'
  }
}).then( ({ status }) => {
  console.log(status) // 201
})
```
This way you don’t have to create a named alias everytime you want to get some data from the request. If you want to learn more about destructuring, you can read [of my older posts on this topic](/using-destructuring-in-cypress).

If you want to use data from the response elsewhere in the test, you can check out [this post on working with API data](/working-with-api-response-data-in-cypress), or [this one, on using variables in Cypress](/cypress-basics-variables).

## Testing response data
Now that we have gotten data from our server, we can proceed with testing them. Cypress has bundled chai library, which you can use inside your `.then()` command.

```js
cy.request({
  method: 'POST', 
  url: '/api/boards', 
  body: {
    name: 'space travel plan'
  }
}).then( ({ status }) => {
  expect(status).to.eq(201)
})
```
Response body is usually stored in JSON format, which means that if you want to find particular item in the response and test it, you need to find a proper path. [I dive more deeply into this topic in one of my older blogs](/reading-and-testing-json-object-in-cypress), but a simple example would look something like this:
```js
cy.request({
  method: 'GET', 
  url: '/api/boards', 
}).then( ({ body }) => {
  
  expect(body).to.have.length(2) // check number of items 
  expect(body[0].name).to.eq('space travel plan') // check first item in array

})
```
You can test various attributes of the API response as the bundled chai library is pretty versatile. For example, you can check whether returned content has the proper type, contains certain items or you can write your own function to check a value.
```js
cy.request({
  method: 'GET', 
  url: '/api/boards', 
}).then( ({ body }) => {
  
  expect(body.length).to.be.greaterThan(1) // more than 1 item is in list
  expect(body[0].name).to.be.a('string') // the text 'space travel plan' is a string
  expect(body[0].id).to.satisfy((num) => { return num > 0 }) // id must be bigger than 0

})
```

## Using cypress-plugin-api plugin
Cypress will open browser each time you run a test, which is something to have in mind once you decide to use Cypress for API testing. Also, you need to open browser console to look into the details of Cypress response. 

But with [cypress-plugin-api plugin](https://github.com/filiphric/cypress-plugin-api), the request, as well as response get rendered into browser window, so you can easily observe your API even in GUI mode. This plugin will add `.api()` command to your Cypress library, and the syntax is very similar to `.request()` command.
```js
cy
  .api({
    method: 'POST', 
    url: '/api/boards', 
    body: { name: 'new board' }
  })
```

This test will then produce this nice render in your test:

<v-img alt="cy.api command in action" src="cypress-plugin-api.png" shadow="shadow-lg"></v-img>

Hope you liked this. You can help me spread the word and share this post with your friends if you feel like I deserved it. Make sure to follow me on [Twitter](https://twitter.com/filip_hric/) or [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/).
