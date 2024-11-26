---
title: "Test like a developer, develop like a tester"
date: 2024-11-27
published: true
slug: "test-like-a-developer-develop-like-a-tester"
description: "How testers and developers can work better together. This is a written version of my keynote talk from Front-End Test Fest 2023."
tags: ["testing", "development"]
image: test_like_developer_develop_like_tester_cdxoco.png
cypressVersion:
---

> Note: this blogpost is a written version of my keynote talk from [Front-End Test Fest 2023](https://www.youtube.com/watch?v=seBOsmxW_tc)

For years now, I’ve been living a double life. During the day, I do my job as a tester. I write test automation, go to meetings, do exploratory testing, take notes, and perform to the best of my abilities. But when night falls, I transform - I become a developer working on my own homepage, creating and enhancing applications, wrestling with bundlers, frameworks, CSS, databases, and APIs.

Being in both of these worlds got me thinking about life of a developer and a tester. I’ve seen way too many companies where the barrier between these two roles is very high. Testers and developers don’t sit next to each other, don’t talk and worst of all, don’t understand each other. They live their working lives in separate rooms, in separate buildings, or even in separate companies.

While testers and developers differ in skills, they share common goals (or at least we should). In my opinion, testing and development are two sides of the same coin. When a developer runs their web application in a browser, are they suddenly not a developer? When a tester designs an automated script, have they stopped being a tester?

Of course not. 

I think this barrier does us both a disservice. Developers have developed amazing strategies for delivering great software and growing as a team. Testers have done the same. By sharing this knowledge, we could create something greater than the sum of our parts - where one plus one truly equals three.

This blogpost is a collection of thoughts and ideas on how we can work better together. Enjoy.

## Testers should get good at understanding code
I know this thought might trigger some testers, especially those who have been able to build their careers without a deep understanding of code. But I’m not suggesting that testers become developers or start doing code reviews. Nor am I suggesting that if you don’t posses this skill, it makes you a worse tester.

I’m simply suggesting that getting a better understanding of the building blocks of the application you’re testing will give you another layer of insight. It empowers you to look for issues in places you might not have considered before. It might help you have better technical conversations with developers. It gives you opportunities to ask better questions whether it is during testing or planning. 

## Developer should work on test flakiness
While it’s often being stuck to test automation engineers, developers should really think about test flakiness as their problem too. I often say that test flakiness is almost always a problem with the application, not with the test. My experience at Replay.io has taught me that. As part of my job I have gone through hundreds of flaky tests and examine the runtime only to discover a re-render, errors in state management or missing interactivity. 

These are all issues that test automation scripts reveal, but are often brushed off as "test is running too fast" or "test is running on a different environment". But these issues actually reveal issues that might occur with real users too.

## Testers should treat test automation as development
Test automation code is often treated as a second-class citizen, with many teams keeping it separate from the main codebase. This artificial split between development and testing needs to end because **test automation is development**. As a test automation engineer, you are both a developer and a tester.

To elevate your test automation:

- Use developer tools like ESLint, Prettier, and TypeScript
- Build reusable libraries and utilities
- Write comprehensive documentation
- Implement peer reviews with both developers and testers
- Create quality checklists
- Prioritize test efforts as a team
- Celebrate wins and demonstrate value

By treating test automation with the same rigor as product development, we can break down barriers between developers and testers while delivering higher quality software.

## Developer should shift focus on users

My friend Andy Knight, in his remarkable talk about "8 Software Testing Convictions", talked about the concepts of shifting left and right in testing. "Shifting right" in testing emphasizes the importance of what happens after shipping features. As testers, we track bugs, assess their severity, and understand user impact. Developers should build this mindset too.

At my previous company, we used a simple but effective bug classification system based on quality and quantity. Critical incidents affecting many users were top priority, while low-impact issues affecting few users were lower priority. This created a shared understanding across the organization about what issues truly mattered.

![Bug classification system](/abcd_jfp6kf.png){class="invert"}

Whether you were the CEO, a helpline worker, a tester, or an engineer, this shared model kept everyone focused on what truly mattered. It created a common language around quality and helped everyone understand the vital role of testing in the organization.

This user-centric approach reminds us that users care about having a working product, not the technical details. As testers, we can help keep development focused on the end user experience.

## Testers should focus on test execution

The "Don't Repeat Yourself" (DRY) principle is a solid foundation for any codebase, though like all principles, it can be taken to extremes. Senior developers excel at making design decisions that enhance code maintainability and readability. As testers responsible for our test code, we should adopt this same mindset.

However, DRY in test automation extends beyond simply avoiding duplicate functions. We need to apply the DRY principle not just to code creation, but to code execution as well.

Smart test execution decisions can dramatically improve efficiency. My top two contestants for this are test tagging and code coverage. Test tagging allows you to run relevant tests when needed. Code coverage gets bad reputation for focusing on vanity metrics, but it can be really helpful for identifying gaps and redundancies in your test suite.

For common scenarios like login, avoid repetitive UI interactions by using API calls or browser state management that tools like [Cypress](https://docs.cypress.io/api/commands/session) and [Playwright](https://playwright.dev/docs/auth) provide out of the box. This can significantly reduce execution time while maintaining test coverage.

## Developers should not forget about testability

Let's circle back to the concept of shifting left and an often-overlooked aspect of early testing: testability. As a tester, I once experienced that dreaded moment when suddenly all my tests failed. I investigated, dug through logs, and then discovered the cause - developers introduced CAPTCHA to the application without considering the test environment.

These situations shouldn't happen. Testing isn't an afterthought - it's a fundamental part of your development strategy. When developers build testability into their applications from the start, they're not just helping testers; they're helping themselves ensure their code works as intended.

There are numerous ways developers can support testability. Create environment-specific switches to disable rate limiting in test environments. Build tools that help test automation scripts handle authentication smoothly. Work closely with your testing team to understand their needs and implement solutions that enable thorough testing of your code.

## Testers and developers should share what they have learned
Testers and developers aren't opponents. We're partners in delivering quality software that serves users. By breaking down these artificial barriers, we can create something truly remarkable.