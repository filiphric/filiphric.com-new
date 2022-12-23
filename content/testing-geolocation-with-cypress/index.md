---
title: "Testing geolocation with Cypress"
date: 2022-08-02
published: true
slug: "testing-geolocation-with-cypress"
description: "Explanation on how to test a page that can locate its users either via API call or using browser’s Geolocation API capabilities "
tags: ['cypress', 'geolocation', 'location', 'gps', "api"]
---
Today’s websites have various ways of determinig user’s location. Before we know how to test them it is vital we understand them. 

Basically, there are two ways of locating a user. First way is by using API call to a server, which can identify user’s location based on where the user is connecting from. The second way is to use browser’s [Geolocation interface](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), that will provide the frontend application with position coordinates.

## Testing a pricing page
[In the application under test](https://github.com/filiphric/trelloapp-vue-vite-ts), we have a pricing page. This pricing page will show pricing in different currencies based on whether user is connecting from EU, UK or anywhere from rest of the world.

<v-img alt="Pricing page" src="pricing.png" shadow="shadow-lg"></v-img>

Moreover, pricing page uses Purchasing Power Parity to provide a discount to some of the countries. All of this is handled by a `GET /api/location` endpoint. This points to a service that will determine user’s location and return the details about the country and some other details. The response from server will look something like this:

```json
{
  "location": "sk",
  "currency": "EUR",
  "discountEligible": true,
  "discountAmount": 20
}
```

## Intercepting location request
To determine if our frontend works as intended, we can intercept our API call and provide our own data as response. For example we can change the `location` and `currency` attributes, by writing our test like this:

```js
cy.intercept('GET', '/api/location', {
  location: 'UK',
  currency: 'GBP'
})

cy.visit('/pricing')
```

This will render our page as if it was opened in Great Britain region, with £ as the main currency. Notice how price changed as well. This is something which usually needs a test, so that we can make sure prices show up as intended.

<v-img alt="Intercepting location" src="intercept-location.png" shadow="shadow-lg"></v-img>

This opens up a possibility to test different combinations of currencies, locations and discount eligibility. Since our frontend relies on API to determine user’s location, we are isolating the frontend and testing different cases based on mocked API response.

## Browser Geolocation
With browser Geolocation API, users can allow browser to provide position coordinates to the application. Many sites use this, to determine your location and provide you e.g. with suggestions of restaurants near you. If you have ever seen this dialog, you’ve seen the Geolocation API in action:

<v-img alt="Geolocation prompt" src="geolocation-dialog.png" shadow="shadow-lg"></v-img>

In our application, we have a "Find My Location" button, that will reveal a map with your current location when clicked. When trying to automate this flow in Cypress, we immediately stumble upon a problem:

<v-img alt="Geolocation prompt in Cypress" src="geolocation-cypress.png" shadow="shadow-lg"></v-img>

In the top left corner you can see that our location prompt is appearing in Cypress window. Since Cypress is running inside the browser, there’s no way of confirming this dialog. However, there are two ways we can approach this. Using a plugin to allow Geolocation automatically, or stubbing it.

## Browser permissions plugin
[With this neat plugin](https://github.com/kamranayub/cypress-browser-permissions), we can enable or disable certain browser permissions right within our test suite. There are couple of steps we need to follow in order to make this plugin work. After we install the plugin, we need to register a function within `setupNodeEvents` function. Finally, we need to provide out `env` with `browserPermissions` object, where we define rules for different permission. All of this is explained in plugin’s README.md file.

```js [cypress.config.js]
import { defineConfig } from 'cypress'
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on, config)
    },
    env: {
      'browserPermissions': {
        'geolocation': 'allow',
      }
    }
  }
})
```

Setting up this plugin will automatically allow Geolocation. You can imagine this as automatically clicking that "allow" button in the mentioned dialog.

## Stubbing the location
When using Geolocation API, our frontend will call this API within browser. The Geolocation API is available in `window` object under `navigator`. In other words, when an application wants to get user’s location from browser, it will call a function that looks something like this:

```js
window.navigator.geolocation.getCurrentPosition()
```

This function call will either return the position coordinates or throw an error. There are multiple ways of handling this and you can read about them in the [Geolocation API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). In our application, we are taking the coordinates and send them to a map object, which will render our map position based given coordinates.

With Cypress we can substitute the real coordinates that our browser would provide an instead use our own. This means that our test will display the map the same way whether it is running locally on your computer or on a pipeline somewhere on the other side of the world.

```js
cy.visit('/pricing', {
    onBeforeLoad ({ navigator }) {
      // Košice city
      const latitude = 48.71597183246423
      const longitude = 21.255670821215418
     cy.stub(navigator.geolocation, 'getCurrentPosition')
       .callsArgWith(0, { coords: { latitude, longitude } })
    }
  })
```

I found this solution on [stackoverflow](https://stackoverflow.com/questions/62634691/cypress-mock-geolocation), and it was nicely demonstrated in a [neat video by Ioan Solderea](https://www.youtube.com/watch?v=3aryQnTQrJs&list=PLNQq42pqd-rzeW-w40zJDRtqFA-NQnxPl&index=14) as well.

While this may feel like a hack, it’s actually a pretty good solution for our test. Mostly because we are dealing with functionality of the actual browser here. This functionality is not part of our application’s codebase. But we are using data from that API and we need to make sure it is handled properly. That’s why it would be valuable to make sure that our map will actually show up in our DOM. Visual testing tools like [Applitools](https://applitools.com/) are really useful in these types of scenarios.
