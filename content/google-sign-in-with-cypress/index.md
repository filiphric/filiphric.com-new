---
title: "Google Sign in with Cypress"
date: 2022-02-07
published: true
slug: "google-sign-in-with-cypress"
description: "Explanation on how to log in to Google SSO enabled app programmatically and how does the process actually work."
tags: ['cypress', 'google', 'login', 'sso', 'third party']
---

If you ever tried to click on "Sign in with Google" button with Cypress, then you know it throws an error. ~~The reason for that is that Cypress does not support [visiting multiple domains](https://github.com/cypress-io/cypress/issues/944). This feature is still [being worked on](https://github.com/cypress-io/cypress/pull/20022)~~ (EDIT: Multi-domain support [landed with version 9.6.0](https://docs.cypress.io/guides/references/changelog#9-6-0)), however, in order to log in to Google, you don’t need this feature to land. The good news is, that while the `.visit()` command redirects in your app allow you to be on a single domain only, `.request()` can go anywhere.

Instead of clicking through login, you can login programmatically and appear to your app as a logged in user. In this post I will walk you through the process. You can find the explanation in [Cypress docs](https://docs.cypress.io/guides/testing-strategies/google-authentication) as well, but if you want some more context on the nuts and bolts of this, make sure to continue reading.

## How does Google SSO work?
Google SSO is following a standard OAuth 2.0 flow. You might find some graphs on the internet. However, I have always found them quite overwhelming. Plus they told me nothing about how should I test them in Cypress. So let me provide you with a metaphor.

Imagine an exclusive club. In front of that club, there’s a guard that let’s guests in. Once he allows you to get in, you’ll get a stamp sign on your hand. Only those that have this stamp sign on, are allow to enter the club, dance, order drinks and stay in the club. In your application that would be some kind of token, usually stored in your cookies, that will authenticate you against your app.

![Club metaphor for authentication](club.png" shadow="shadow-lg)

In this metaphor, the club is your application and all the data that is stored in database. In order to access it, you need to be authenticated. In a typical login/password situation you would tell the guard the password and your name and he’ll let you in.

Of course, there could be some more situations. You’re not on the list (user not registered), or use a wrong password. Or the club is closed due to technical problems (error 500).

So where does Google SSO come in? In this particular situation, you don’t have a password, but instead you have a good friend that knows the club owner and can get you to that super-exclusive club. The guard knows about this, trusts your friend, and will let you in.

![Google authentication](google.png" shadow="shadow-lg)

Notice that no password is needed in this situation, because everything depends on the communication of your friend and the guard. You just need to have that friend that will communicate with the guard. In our application, these will be two servers talking. In general, it actually does not matter all that much whether it is the Google server, or some other OAuth provider.

It goes without saying, that if you want to sign into an application with Google SSO, you need have an application that uses it. But how does one set up such an application? I want to describe this before we dive in to writing a Cypress test. It’s going to be useful in order to get a good understanding of how to solve the problem of logging into Google with Cypress.

## How to setup a Google SSO-enabled app
Google has made a creation of an SSO-enabled app pretty easy for developers. There are some [great examples](https://egghead.io/lessons/javascript-add-a-google-oauth-2-0-login-button-to-your-site) on how to set it up for your application. These require you to follow a couple of simple steps. There are a couple of steps to this:
1. Create a OAuth project on [Google developer console](https://console.developers.google.com/)
2. Set up which domains this application can be used on
3. Set up where you will be redirected after a user returns from Google login screen
4. Add a button to your frontend
5. Add a validation to your backend

Step 1 will create a **Client ID** and a **Client secret** for you. We’ll get to these items shortly. Just remember they exist.  The names might be a little confusing, because *client* in this context points to your application, and not the user that is trying to log in to your application. But these two items will be important, when we’ll attempt to log in.

The rest of these steps are done by developers. But as a tester, it is good for you to know, that there is such a thing as a Google developer console. And that in order to create that "Log in with Google" button, you need to register your app in the console. In our metaphor, this would be the part where we establish the relationship with our influential friend.

By the way, if you want to try this whole process, I suggest you create your own project in [Google developer console](https://console.developers.google.com/). Copy the **Client id** (you will just need that one), and set your origin URLs to `http://localhost:3000`. If it looks something like this, you are on the right track:

![Google developer console](console.png" shadow="shadow-lg)

You can do this on my [Trello app](https://github.com/filiphric/trelloapp-vue-vite-ts), or follow the [instructions on Cypress docs](https://docs.cypress.io/guides/testing-strategies/google-authentication) to set this up on [Cypress Real World app](https://github.com/cypress-io/cypress-realworld-app). 

One thing that you might have noticed on the screenshot, but I haven’t mentioned yet, is the `https://developers.google.com/oauthplayground` URL. Let’s look into what it is.

## How to set up the user you want to log in
You can choose whichever Google user you want. Got one? Good. Now go to [OAuth Playground](https://developers.google.com/oauthplayground/). This service will allow you to create a "refresh token". With this token, you can authenticate against Google API. What this means is, that you can access data from your Google account. In most "Google sign in enabled" apps, the data would be things like your profile picture, email, your name, or some other data from your account.

There are many options on this playground, but since we just want to authenticate in our app, we want to choose "Google Oauth API v2".

![Google oauth playground scope](playground_api.png" shadow="shadow-lg)

Don’t try to select all of the different APIs, just to be sure. Scoping the authorization to a minimal degree is certainly the better way. Not only we want to scope the data that the refresh token will have access to, but we want to scope **where** can this token be used. To use it only in our project, check the "Use your own OAuth credentials" checkbox and enter the **Client ID** and **Client secret**. Remember how I mentioned those?

![Google oauth configuration](playground_oauth.png" shadow="shadow-lg)

After setting this up, click the "Authorize API" button and proceed to step 2. You are just click of a button away. Click on "Exchange authorization code for tokens" button and copy the refresh token.

![Exchange authorization code for tokens](playground_token.png" shadow="shadow-lg)

## Login the user in our app
As you might have noticed, there are two big parts to all this. One is the application (project in the Google developer console) and the other part is the user we want to authenticate (OAuth playground). Once we have **Client Id**, **Client secret** and **refresh token** ready, we are ready to log in programmatically. To do that, we’ll create a `.request()` in our test.

```js
cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { id_token } = body
  })
```

Side note: See that I am storing all the important keys in `Cypress.env()`. I don’t actually save them in `cypress.json` or `cypress.env.json` and neither should you. Never save these in your repository and never commit them. Instead, keep them in your environment and add them to Cypress at runtime. [I wrote a whole article](/create-a-configuration-plugin-in-cypress) on how you can do this and you can find an example in [Cypress docs](https://docs.cypress.io/guides/testing-strategies/google-authentication#Setting-Google-app-credentials-in-Cypress) as well.

The `id_token` that is returned from the server is the information (among other) that the Google server will usually respond with once it closes the login window. Instead of interacting with UI, we have now achieved retrieving this information via our `.request()` command.

From this moment on, your application takes over and handles that information. Depending on how well you know the application you are testing, it should get easier from this point on. 

Different applications might slightly differ from one another in how they use this information. Your application might fire an http request, set some cookies, do some redirects, etc. Usually it will take the `id_token` and validate it on server. This means that you may need to do another `.request()` inside the `.then()` command.

In my Trello application, I have a slightly simplified workflow, where I send the token to the server, where it is validated. If the validation fails, server will return the error. But if it succeeds, server will respond with an authorization token, and the user will become authorized to perform actions in the app. So my request will look something like this:

```js
cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { id_token } = body
      cy.request('POST', '/api/login', { jwt: id_token })
        .then( ({ body: { accessToken } }) => {
          cy.setCookie('trello_token', accessToken)
        })
  })
```

## Short FAQ
**Do I need to add https://developers.google.com/oauthplayground to the redirect URIs in my project?**
Yes. Without this the user token generated on OAuth Playground will not work for logging into your app.

**Can I use any Google login for this?**
Yes, it can be a gmail.com address or a company address that uses Google apps. You will need to generate a refresh token for each of the users you want to log in.

**Can I do this without knowing the Client ID and Client secret?**
No. You need to obtain these if you want to use this method. However, there’s a good chance you already have them available in your environment if you are using Google SSO for your local development.

Hope this helps. If you feel like this might help someone share the article on your social network. If you want some more articles, good news! They are coming! You can subscribe to a newsletter, check out my [YouTube channel](https://www.youtube.com/channel/UCDOCAVIhSh5VpJMEfdak1OA), or follow me on [Twitter](https://twitter.com/filip_hric/) or [LinkedIn](https://www.linkedin.com/in/filip-hric-11a5b1126/).
