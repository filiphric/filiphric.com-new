---
title: "Understanding timeouts in WebdriverIO"
date: 2025-02-19
published: true
slug: "understanding-timeouts-in-webdriverio"
description: "Learn how to effectively use timeouts in WebdriverIO to create reliable end-to-end tests"
tags: ["webdriverIO","testing","timeout"]
image: webdriver_io_robot_peodfj.png
webdriverioVersion: 9.2.12
---

Timeouts are one of the vital parts of UI end-to-end testing. When testing user interfaces, we often need to deal with various forms of randomness (or apparent randomness) in how elements appear and interact.

WebdriverIO handles this by having commands that run in a loop, trying to locate elements or make assertions until they either succeed or eventually fail. You can think of timeouts as upper limits - if the desired action happens within the timeout period, the script continues.

## Timeouts vs. Hard Waits

So how are timeouts different from hard waits? Hard waits or pauses stop the test execution altogether. When using a hard wait, we essentially disconnect from the application under test, hoping that during this pause the application reaches the desired state. This approach is flaky by design because it's detached from what the application is actually doing.

```js
// Don't use hard waits
const button = $('aria/Submit')
 // ❌ Stops execution for 2 seconds regardless of state
browser.pause(2000)
await expect(button).toBeDisplayed()
```
Timeouts, on the other hand, are a great way to stay connected to the application under test. Because they enable us to constantly check the state of the application, they are typically faster - we move on to the next command as soon as the condition is met.

```js
// Much better approach
const button = $('aria/Submit')
// ✅ Continues as soon as element is found
await expect(button).toBeDisplayed() 
```

## Types of Timeouts in WebdriverIO

Let's look at timeouts in a real-life scenario. I have a small game application with three closed doors that open to reveal different characters - some are enemies and some we should protect. 

![Game application](/ghosts_goqsla.png)

Whenever we run this game, the time it takes for a character to appear is random, which poses a challenge for our test.

Here's a basic test that handles this randomness:

```js
import { browser, $ } from '@wdio/globals'
it('open all three doors (waitForDisplayed)', async () => {
  await browser.url('/')

  const startGameButton = $('[data-test="start-game-button"]')
  
  // Start the game
  await startGameButton.waitForDisplayed()
  await startGameButton.click()
  
  const door1 = $('aria/Door 1')
  const door2 = $('aria/Door 2')
  const door3 = $('aria/Door 3')
  
  await door1.waitForDisplayed()
  await door2.waitForDisplayed()
  await door3.waitForDisplayed()
})
```

This test passes even with random timing because the `waitForDisplayed` command keeps retrying until it finds the element. But how long does it wait?

The answer is in the WebdriverIO config:

```js [wdio.conf.ts]
export const config: Options.Testrunner = {
  // ... existing code ...
  waitforTimeout: 10000, // Default timeout for all waitFor commands
  // ... existing code ...
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000 // Overall test timeout
  },
}
```

The `waitforTimeout` setting dictates how long we want to wait for all `waitFor` commands (like `waitForDisplayed`, `waitForClickable`, `waitForEnabled`, etc.). If we were to change this timeout to 1 second, our test would likely fail since elements often take longer to appear.

We can also set timeouts for individual commands:

```js
await door3.waitForDisplayed({ timeout: 1000 }) // Override timeout just for this command
```

## Test Suite Timeouts

Another important timeout determines the length of the whole test. In our example, the test takes about 12 seconds to finish. For longer tests, we might want to set an upper limit using Mocha's timeout option.

The default Mocha timeout is 30 seconds, but we can adjust this in the config:

```js
mochaOpts: {
  ui: 'bdd',
  timeout: 30000 // Adjust this value to set test timeout
}
```

## Best Practices

Timeouts are a great way to set upper limits for actions in our tests, but you need to be careful not to set them too high. Remember that the timeout is also the time it takes for your test to fail. If you have multiple tests in your suite that are going to fail, high timeouts will significantly increase the overall execution time.