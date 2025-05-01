---
title: "Testing email flows with Mailosaur"
date: 2019-09-13
published: true
slug: "testing-email-flows-with-mailosaur"
description: "A short giude on how to test e2e flows that require an email to be opened. Code demonstration using Mailosaur."
tags: ['cypress', 'email testing']
image: "mailosaur_bgkd1u.png"
---

<Tweet id="977018512689455106" />

I would like to give you a glimpse of how we use Cypress with a tool called [Mailosaur](https://link.filiphric.com/mailosaur).

## Telling the whole story

When writing tests, I like to resemble user behavior as much as possible. In other words, **I want to tell the whole story.**

Let me give you an example. Let’s say you forgot your password to your account. Here is what you would do as a user. You would:

1. go to reset login page and request password reset
2. receive an email with a reset link
3. visit that link
4. type in your new password
5. log in with new password

With Cypress, you can easily take care of step 1. But getting to step 3 requires opening an email inbox, which is not something you can easily do (or want to do) in a test.

Normally, this is something you would solve on staging environment, by either creating a special setup, where you can access the information you need. But that is something that user does not do, so it does not resemble the nehavior of a real user. You can of course make sure that every part of the functionality works (which is good), but if you are like me, you’ll feel like that’s not enough.

## Enter Mailosaur

[Mailosaur](https://link.filiphric.com/mailosaur) a service that creates an email inbox for you. What’s special about it is, that you can access it not only via their interface, but also via their plugin. All of email content and metadata can be viewed in plain text, HTML, or parsed to JSON, where you can view all links, attachments or images.

My favourite part is the fact that you can [wait for a specific message to arrive](https://link.filiphric.com/mailosaur-cypress-plugin). This means you can access all of that information within few milliseconds and then use them further in your test.

With Mailosaur, you create an email server, where all emails with specific username land. You’ll end up with something like:

```plaintext
{{any string here}}.abcdefg@mailosaur.io
```

## Integrating Mailosaur with Cypress

Mailosaur has integrations for all the main testing frameworks such as Cypress, Playwright, WebdriverIO, and [much more](https://link.filiphric.com/mailosaur-tools). With Cypress, you can simply install the plugin, set it up and start testing your emails.

```bash
npm install cypress-mailosaur
```

After installation, you need to import the plugin in your support file.

```js [support/e2e.ts]
import 'cypress-mailosaur'
```

You also need to set up your API key in your Cypress config file, or make sure to have it in your environment variables so that it can be passed to the plugin. You can get your API key from the Mailosaur dashboard.
```ts [cypress.config.ts]
import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    MAILOSAUR_API_KEY: 'your-mailosaur-api-key',
  },
})
```

You should now have everything set up and ready to go. So let’s write a test.

```ts
const userEmail = 'email.abcdefg@mailosaur.io'

describe('Reset password flow', () => {

  it('Should receive an email and use reset password link', () => {

    // trigger reset password for user
    cy.visit('/reset-password')
    cy.get('input[name="email"]').type(userEmail)
    cy.get('button[type="submit"]').click()

    cy.mailosaurGetMessage("abcdefg", { // abcdefg is server name
      sentTo:userEmail, 
      subject: 'Password reset'
    }).then( response => {

      // continue with test, open link
      cy.visit(response.body.text.links[1])

      // fill in and confirm new password
      cy.get('input[name="password"]').type(newPassword);

      cy.get('button[type="submit"]').click();

      // land on desired page after confirming password reset
      cy
        .location('href')
        .should('contains', '/login');

      // login with my new password
      // ...

    })

  });

});
```
After obtaining the reset password link, you can continue with your test journey. Opening link, setting up new password, and then finally logging in to application. This resembles real life behavior more closely, connecting and integrating each step.
