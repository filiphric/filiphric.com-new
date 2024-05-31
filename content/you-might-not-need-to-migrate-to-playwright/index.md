---
title: "You might not need to migrate to Playwright"
date: 2023-10-11
published: true
slug: "you-might-not-need-to-migrate-to-playwright"
description: "If you are looking for stable and fast test execution, there’s no need to jump to the newest framework. Playwright is cool, but you might be bringing the same problems to your new project on migration"
tags: ["cypress","playwright","migration","e2e"]
image: road-split_n4aoax.png
cypressVersion:
---
> Disclaimer: If you are expecting a blogpost trashing Playwright, I might disappoint you. I think Playwright is an impressive tool. This blogpost discusses different aspects of test suite migration, reasons for (not) doing it as well as some of the common problems with modern e2e testing.

You probably stumbled upon articles recently, showing off successful migrations from Cypress to Playwright. Some showcasing massive improvements in test execution time and other benefits. These articles are great examples of success stories.

It’s no surprise, Playwright is an impressive tool. While I’m still a big fan of Cypress and prefer it for most projects, there’s no denying that Playwright seem to offer benefits that many engineers long for. I’ve been hearing many anecdotes about migrating whole Cypress projects into Playwright. Even my friends from my former employee Slido decided to do this.

So is it time to move to Playwright? Personally, I don’t think it is worth jumping on the hype train.

Don’t get me wrong, if you have experience with Playwright and you work faster, write more stable tests, then by all means go for it. Just make sure you are aware what you are signing up for.

I’d like to discuss some of the issues that you might consider 

## Migration cost
Any framework migration is going to cost a lot of time and a lot of money. You need to weigh this in to your current maintenance cost. Let’s say that your current split is 30% test creation and 70% test maintenance. Your maintenace will probably grow up to 90% or even full 100% for a certain period of time. Bigger teams will probably handle this better than smaller ones, but even those will take a significant performance cost. A good estimate of how long will the migration take is essential. It may make more sense for couple of weeks, but it can be a significant hit if the migration will take couple of months.

Maintenance cost is present with every framework. At the end of the migration you need to make sure that the maintenance cost will go down. So if it was 70% before, it should go down to 50% or 40% to justify a lenghty migration.

## Performance benefits
A good way of determining whether the migration is worth it is to try it on a smaller project to get the initial proof of concept. It’s especially beneficial if you focus on test creation and test maintenance time. 

While it’s fun to look at numbers of execution time, I don’t think it is a good metric to look at. Don’t get me wrong, it does carry *some* weight. Especially if a quick feedback on CI is essential and your app build step is significantly faster than test step.

But it’s not waiting for pipeline to finish that takes most of your day. It’s the test creation and test maintenance. Time spent on these tasks cost your company more than test execution time.

So while Playwright is faster and may be easy to sell to your product owner, it may or may not save you money. Depends on how healthy your test suite is.

There’s also one more thing to mention on test execution time. With Cypress and Playwright we have essentially reached top speed of test execution. It’s no longer the tool that determines the speed of execution, but the application under test.

There are of course some differences between Playwright and Cypress, since Playwright executes from Node.js and Cypress opens a browser and renders a whole UI. But these differences are going may sink into your app’s ability to load.

## Test suite health
One of the main reasons to get frustrated with Cypress (or any other currently used framework) is the health of the test suite. This can be measured by failure rate, flakiness rate, test execution speed or any other other metric that matters to you.

Low test suite health will result in increase of maintenance ratio. More time is spent, more people are involved and therefore bad test suite health may result in cost increase for your company.

The reason for bad test suite health may be the framework itself, but it is only one of the reasons. No one likes flaky tests, but it’s definitely worth examining whether the reason for test flakiness is the test itself, or the applucation under test. I recently asked this theoretical question on LinkedIn:

![LinkedIn poll on flakiness](flakiness_poll_zrbg6f.png)

The results seem to be suggexting that when trying to solve test flakiness we might not always be looking at the right problem.

Whenever test flakiness is involved, a bigger part of a team should be involved to. While ownership of test automation is often assigned to QA teams, the resolution of testing problems should be a team effort - the same way that quality should be a team effort. If this is not the case in a given company, switching tools is not going to solve anything.

## Battling flakiness
Flakiness is annoying. If our tools could tell us the exact reason why a certain test is flaky, we would probably not talk about it so much. But most of the time, we are stuck with reporting tools, screenshots, videos, trace viewers and some other artifacts. These are all great tools and [I’m arguing that improvements of these tools](/next-big-trend-in-testing-debugging) is going to be very important in following years.

I like to say that flakiness is just lack of insight. Let’s take a simple example.

```js [spec.cy.ts]
cy.get('button').click()
cy.wait(5000)
cy.get('[data-test=item]').should('be.visible')
```

`cy.wait()` is the most basic way of fixing flakiness. We simply ask our test to stop executing, so that app can finish doing its thing. The real question is - what is the app doing? It can be waiting for responses from API, doing a calculation in a background, routing to another subpage, accessing browsers API or counting down a timeout.

We could write the same test in Playwright, and it would still be the same.
```js [spec.ts]
await page.click('button');
await page.waitForTimeout(5000);
await page.waitForSelector('[data-test=item]', { state: 'visible' });
```

The real reason why we are waiting is that we don’t know what is happening in our app. I guess if we had a stable app and stable server, our tests would **really** be more stable.

A more common problem problem with test flakiness are connected to timing issues. For example if the application under test performs two operations and does not handle the completion order. Let’s take a look at this example:

```jsx [App.tsx] {5-6}
const settingNumber = () => {
  const [number, setNumber] = useState(0);

  const createRace = () => {
    setNumber(1);
    setNumber(2);
  };

  return (
    <div>
      <button onClick={createRace}>Click me!</button>
      <p>Number: {number}</p>
    </div>
  );
};
```
As you can see, we call `setNumber()` twice. In a real world example you could imagine multiple API calls that update a part of your application. A double-click, server response lag, slower rendering performance or any other factor may have influence on the result. Since these functions are asynchronous, the number rendered in our `<p>` element may be 1 or 2. Or even better, it can jump from 1 to 2 and vice versa. 

Now imagine we are not dealing with number 1 or 2, but with rendering of a whole component or a page redirect.

Both Cypress and Playwright deal with these types of situations pretty well. They utilize retryability, account for elements actionability and perform various checks to prevent flakiness. But this type of problems will be present in any framework.

## Getting insight
The example given above is of course an oversimplification. Timing issues, re-rendering and other gotchas of modern web are going to stay with us for some time.

The real question is - how do we account for them? The answer both is simple and complicated: By getting more insight. If we want to battle flakiness, we need to get the missing insight and improve our test suite help, but also the application health.

[There’s a great blogpost](https://codingitwrong.com/2020/10/09/identifying-code-smells-in-cypress.html) from Josh Justice, that I keep coming back to. It talks about identifying problems within application by using e2e tests in Cypress. I feel like this is an ultimate goal of e2e testing.

We need to take the application under test into the equation. One way of doing that is using Replay.io. There are similarities between Cypress’ timeline and Playwright’s trace viewer. But Replay is a lot more. It’s basically 3 tools in one:
- browser
- recorder
- debugger

As a browser it can be used in both Cypress and Playwright. As a recorder, it will trace all interactions, DOM states, and network communication. But in addition to that it will capture the app’s source code and data flowing through it. As a debugger, it will allow you to travel back in time to any point of test execution and examine internal state of application. In the `createRace()` function from previous example we would be able to tell which `setNumber()` returned first or even see if the `<p>` element rendered multiple times.

The potential insight from this type of recording is much more robust and has the potential to provide with insight into timing issues or any kind of flake source.

## Knowing your tools
I’ve seen people saying that Playwright is a simpler tool, which blows my mind. I personally prefer Cypress’ syntax much more, but this speaks volumes about how diverse the web dev space is. If Playwright is a tool that allows you to create your tests faster more stable and keep your maintenace cost to a minimum, then you should definitely give it a try.

If you are considering migrating to Playwright because of your frustrations with Cypress, please give it a second thought. There might be many reasons why the tests don’t work the way you might expect. While having an experience with variety of tools is important, it’s also important to get a good understanding of the tools you currently use, and more importantly - to get a good understanding of the application under test.

There are some common mistakes I see people do when using Cypress, especially among people who are migrating from another tool (see the irony?). I have written some tips on how to mitigate the most common ones [in this blogpost](/8-common-mistakes-in-cypress-and-how-to-avoid-them).

I also recently created a [repository of Cypress flakiness examples](https://github.com/filiphric/cypress-flakiness-debug-examples) in which I show how to debug most common sources of flakines using Replay.