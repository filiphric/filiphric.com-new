---
title: "Testing lists of items"
date: 2020-04-06
published: true
slug: "testing-lists-of-items"
description: "Short description of various ways of testing list of items using Cypress, utilizing Cypress’ retryability."
tags: ['cypress', 'commands', 'retryability']
---

## TL;DR:

- *you can test your lists using .then() or .each()*
- *Cypress retries can help you test changes in your app*
- *you can pass a function to .should() command*


This is a JSON:
```json [filename.json]
[
  {
    "name": "hello",
    "true": false
  }
]
```

```js
cy.get('#element') // new chain
  .click()
  .get('#modal') // new chain
  .type('text{enter}')
```

```ts {3-4,11-12,22-23}
Cypress.Commands.add('take', (input: string) => {

  let element: JQuery<HTMLElement> | HTMLElement[];
  let count: number;

  const log = Cypress.log({
    autoEnd: false,
    consoleProps() {
      return {
        selector: input,
        'Yielded': element,
        'Elements': count
      };
    },
    displayName: 'take',
    name: 'Get by [data-cy] attribute'
  });

  cy
    .get(`[data-cy=${input}]`, { log: false })
    .then(($el) => {
      element = Cypress.dom.getElements($el)
      count = $el.length;
      log.set({ $el });
      log.snapshot().end();
    });

});
```