---
title: "Time-travelling with Replay.io"
date: 2023-07-31 9:00:00
published: true
slug: "time-travelling-with-replayio"
description: "Replay.io is a tool that records everything your app does and provides you with debugging superpowers. The recording is a combination of video, source code of your application, DOM snapshots and a timetravel-enabled devtools that allow you to retroactively add print statements to your app’s execution."
tags: ["replay.io","debugging"]
image: time_machine_j5cbxj
cypressVersion:
---

Couple of days ago I looked into a tool called Replay and I got a chance to play with some of the new features but also with the tool as a whole. I was really impressed by the level of insight I got thanks to it as a both tester and a developer.

I think that Replay has the potential to become an inevitable part of development workflow as it can provide a bridge between developers, testers or anyone involved with the product

If you ever got your bug report returned by a developer with a comment "can’t replicate" or debugged a pesky issue with a bunch of `console.log()`s, then you know how difficult the debugging process can get. Replay aims to make this process easier, and believe it or not - fun.

## What is Replay? 
In short, [Replay.io](https://www.replay.io/) is a tool that records everything your app does and provides you with debugging superpowers. The recording is a combination of video, source code of your application, DOM snapshots and a timetravel-enabled devtools that allow you to retroactively add print statements to your app’s execution. The best way to explain its capabilities, is by seeing it in action. Replay.io can be used in different ways, so let’s start with the simplest one first.

## Creating a recording
To create a recording, download Replay.io browser, open it and hit the record button. After you do so, you can start interacting with your application as you would with a normal browser. For example, you can replicate a bug that you are experiencing in your app.

![Replay.io first screen](replay_io_first_screen_pxuxg1)

After you are done with interacting with your application, you will have your recording available. You can rewind or fast forward recording and look at different keystrokes, mouse clicks or other interactions. If you are in a process of replicating a bug, you can add comments to the recording and share it with developers in your team. This is where the real magic begins.

![Replay.io viewer screen](viewer_bs89i9)

## Time travelling with DevTools
The fact that this recording can be done by anyone can lift a lot of weight off of developer’s shoulders. But creating the recording is just the beginning of the journey. Replay.io provides you with a set of devtools, that look very similar to Chrome or Firefox devtools.

But these are now attached to your recording. You can retroactively inspect elements, review API calls in the network panel, look at console logs and so much more.

![Replay.io devtools](replay-io_devtools_cmyswj)

## Examining app code
At a first glance, this may seem quite similar to Playwright’s trace-viewer or Cypress’ timeline. They both alow you to travel back in time in their own way. But what Replay.io does is actually much more powerful.

Besides snapshots and network activity you can access full source code of your application. For example, I can further examine the component of my application that is responsible for creating a to-do item in my application.

In the code viewer, I can click on a "+" button to add a print statement. This will now show the name of the component in our console, essentially giving us information on how many times was the function call being made during the interaction that was recorded.

![Print statement](print_statement_ijzi3y)

But this print statement is actually much more powerful. We can pass a variable from our application into it. That way the information that has been passed through the application becomes visible to us. Notice how we see "Hello world 👋" and "new todo" in the console, after we use `newTodo` variable inside the print statement.

![Custom print statement](custom_print_statement_jlsxh1)

This allows us to follow the flow of the information and debug the application much more effectively. Not only we can see that something happened, but we can find out more about *why* it happened.

If you are using React with a state manager such as Jotai or Redux, Replay.io allows you to take a look inside each component’s state. The React panel in Replay.io devtools will allow you to view component’s state throughout the whole timeline.

![React panel](react_panel_brh2oe)

## Debugging your tests
The recorded information is very useful, but it gets even better. As I mentioned in the beginning, Replay.io is actually a browser. Instead of replicating a bug manually, you can use your test run to create these recordings for you. This can be integrated to both Cypress and Playwright.

The setup is pretty simple. Replay has a Cypress plugin that works exactly like any other plugin. You install it as a package and include it in your `support/e2e.ts` file and in yout `cypress.config.ts`.

```bash
npm i @replayio/cypress
```

```ts [support/e2e.ts]
require('@replayio/cypress/support');
```

```ts [cypress.config.ts]
import { defineConfig } from "cypress";
import replay from "@replayio/cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      replay(on, config);
      return config
    },
  },
});
```

After that, Replay.io needs to be set in your CI. I’m using GitHub Actions, but this can be set up in pretty much any CI provider.

```yml
name: Replay test
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          browser: replay-chromium
          start: npm run dev
      - name: Upload replays
        if: always()
        uses: replayio/action-upload@v0.5.0
        with:
          api-key: ${{ secrets.RECORD_REPLAY_API_KEY }}
```

The API key can be obtained right from Replay.io browser and needs to be added as a secret to your GitHub project. If you are unfamiliar with how to set up GitHub Actions, I suggest you check out [my blog on this](/cypress-and-git-hub-actions-step-by-step-guide).

With this setup, you can run your test and you’ll get all the information you would get before. But in addition to that, Replay.io will record information from your test run as well. These recordings are available right inside Replay.io browser. You can treavel through them in a similar way as you would in the Cypress timeline in open mode.

But remember - since Replay records everything, you can examine not only your test but also your application. If a test becomes flaky for whatever reason, you no longer need to replicate that flakiness locally, but can use Replay.io to get an insight into what is happening inside both your test and your app.

![Cypress test replay](cypress_replay_ktuzio)

To wrap it up, Replay.io can be a helpful companion for recording bugs and providing that information to your developers. It can help you debug your application by adding print statements traveling backwards or forwards in time and it can help you debug your tests by providing all of the information right from your test run.

I think it's a tool that can save you a tons of time it will make debugging a smoother faster and quite frankly an enjoyable experience.

If you are curious about Replay.io, [I’ve created a project](https://github.com/filiphric/cypress-flakiness-debug-examples) where I’m planning on creating some flakiness examples with links to recordings. I plan to couple them with short YouTube video explanations on what the bug is and how it can be fixed either on test’s side or on applications side. Subscribe to the YouTube channel to never miss a new video. You can also subscribe to my newsletter (form is at the bottom of this page) or follow me on [Twitter](https://twitter.com/filip_hric/) or [LinkedIn](http://www.linkedin.com/in/filip-hric).