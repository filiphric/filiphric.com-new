---
title: "Next big trend in testing? Debugging"
date: 2023-08-14
published: true
slug: "next-big-trend-in-testing-debugging"
description: "Debugging has been with us and will be for a long time. Making improvements on that experience might just be the next big thing."
tags: ["debugging","cypress","playwright","replay"]
image: next-big-trend-in-testing-debugging_npi0wy
cypressVersion:
---
## Test Replay coming to Cypress
You may have heard the news about Cypress. With the version 13 they are preparing the biggest release ever. It will introduce a feature called Test Replay, that will allow you to browse through your test run. During your test run, all your DOM snapshots, network calls and console logs will be recorded, providing you with a great level of insight into the test run.

Cypress is an open source solution, but it has a company behind the solution. The premium service that the company offers is the Cypress Cloud service, which allows for an easier parallelisation, test analytics and now - Test Replays.

## Improving debugging experience

The choice of this feature to be the next big thing for Cypress is not a coincidence. Providing an insight into an already ran test is something that all testing frameworks need, although it does not really make it to the front of a landing page. Probably because it deals with the less fun part of test automation - debugging.

Debugging is not often considered to be a fun part, but it’s definitely a daily task for developers and testers alike. While debugging is not as flashy as autonomous testing or AI-powered features are, we’ve been seeing a lot of work being done in this field. Cypress has had Test replays as the vital part of their test runner since the very beginning (timeline in the interactive mode), before it made it to the Cypress Cloud service. Playwright team released trace viewer last year and then has built a whole user interface around it. In the world of Vue, the Nuxt.js DevTools and Vue.js DevTools have been an inevitable part of development workflow. The same goes for React and Angular.

## Debugging is a search for knowledge

All these tools are providing an important aspect to the development workflow - insight.

And while it has not been making the headlines, it is definitely an area where a lot of work has been done in recent years. There are visible efforts from framework maintainers to improve developer experience by providing great debugging tools.

So why is it so important? You can think of debugging as the process of gathering insight. A search for cause of a bug in your software or a flakiness in your test is basically a search for knowledge about your application or about your test. This is why companies spend time for creating great DevTools or session replay tools. Providing developers and testers with more insight will essentially teach them how to use the framework better. Test replays in Cypress will give you more insight into test execution, Vue DevTools will give you better understanding of Vue’s lifecycle.

## The missing piece of debugging

However, there is a missing piece in all of this. Most of the time these debugging tools will provide you with information that’s scoped to a certain context. Cypress’ Test Replay will give you insight to the test execution. Vue.js DevTools will provide you with insight into app’s state. But what if your test is flaky because of the app’s state? What if your tests are not written properly, but DOM snapshots will not show that and you need to debug further?

This is where Replay.io becomes really handy. It’s a tool made entirely around providing a great debugging experience and providing you with insight. It’s a browser for testers and developers that records everything that’s happening in your app. What it creates is an “interactive recording” that combines video with DOM snapshots, network calls, console logs and source code of your application. What makes it interactive is the ability to add print statements into your source code. Basically, you can add a console.log() into this recording and examine what your application was doing at the time of the recording. Since this is a browser, you can use it as part of your development workflow or run your tests against it. As a result, you are getting the whole scope - things that your test does, as well as things that your app does.

Replay.io proves that it’s worth to build a tool specifically for debugging. Along with Cypress making improvements in debugging experience in Cloud and other frameworks improving their devtools we can definitely see a trend emerging. A quiet one, but definitely one that’s worth keeping an eye on.

Debugging has been with us and will be for a long time. Making improvements on that experience might just be the next big thing.