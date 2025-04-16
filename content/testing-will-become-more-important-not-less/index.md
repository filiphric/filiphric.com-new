---
title: "Testing Will Become More Important, Not Less"
date: 2025-04-16
published: true
slug: "testing-will-become-more-important-not-less"
description: "LLMs speed up coding but quality concerns remain. Testing becomes more crucial, evolving to include AI-generated tests while human expertise in test design stays valuable."
tags: ["testing", "software development", "A.I."]
image: "testing_more_importatnt_tng5df.png"
cypressVersion:
playwrightVersion:
vitestVersion:
---

LLMs have sped up code generation to insane levels. But I'm not sure if it's fair to say that it has improved the speed of delivery. There are legitimate questions about the quality of the outcome. Not only quality of the *code*, but the *actual product*.

It seems we still validate the outcome mostly manually - either by reviewing the generated code, or by actually testing the application. 

And although the generated code is not a black box (yet), implementation details tend to get fuzzy as the number of lines of code grows.

And so - testing the application manually seems like the best way to validate the outcome.

But although this makes testing MORE important, it doesn't necessarily mean we will be getting more testing job postings (as some would like to believe).

In fact, I think this is going to create even more pressure for testing to be done faster. As much as I hate it when testing is called "the bottleneck", we may be entering an era where that's actually true.

We can all agree that manual QA has undeniable benefits. But it's hard to make the argument that all testing should be done this way. In most cases, it's slower and more expensive than the alternatives.

So how are we going to realistically keep the software at high quality? 

Here are five of my predictions and possible outcomes.

## #1 Testing will become more embedded into software creation

In other words, when application code is generated, tests will be generated along with it. This will mean that greenlighting the produced code will actually mean greenlighting passing tests as well. 

Since modern AI tools are good at generating code, there's nothing really stopping them from generating tests as well. Of course, it's still good to manually review them (see point #2), but having them generated alongside the code already translates to a lot of saved time.

And as we iterate over new versions, we avoid regressions by running those tests generated in previous iterations.

## #2 More agents and A.I. solutions will add test automation

We are going to see more agents and A.I. solutions that will add test automation alongside produced code. Those that will generate tests along with produced code will see less regressions and will scale much better.

There are already solutions on the market that do their own testing of produced code and avoid regressions or bad outputs by running tests in the background and feeding the results back to LLM such as [Nut.new](https://nut.new) from [Replay.io](https://replay.io).

## #3 Manual testing will evolve not disappear

Manual testing will not disappear, but it will be more granular, focused on manual testing of the new functionality and code reviews. 

Instead of huge test suites that will be manually reviewed one by one, testers will mostly test changes, while regression testing will be a domain of test automation.

## #4 Good test design will continue to be highly valued

Great test engineers understand that putting together some Playwright code and getting test coverage is simply not enough. 

Keeping good testing practices, being able to properly architect test data and properly determine risk areas is more crucial than ever.

For example - when test code is generated using LLM, that generation is guided by a highly skilled tester and reviewed. This will help ensuring the quality of the tests. 

It is exactly the same principle as when a skilled developer drives and reviews the generated application code.

## #5 Application and Test Runtime Will Become a Huge Challenge

While trace-viewing such as we see in Playwright is becoming a standard, we usually don't have this kind of information in the application runtime. 

As [this article from Techcrunch](https://techcrunch.com/2025/04/10/ai-models-still-struggle-to-debug-software-microsoft-study-shows/) shows, AI models still struggle to debug software and not even the better models out there are good at it.

The reason for that is, that large language models are trained on a large amounts of code, but they lack information on how does the written code actually run.

My prediction is that observability tools will be the missing piece in making A.I. produce really reliable code. 

This might mean that manual testing and need for excellence in both development and testing is not leaving anytime soon. In fact, it might be needed more than ever.

But let me know what you think. Will testing be in higher demand, now that development is speeding up? Or will we see the exact opposite? Feel free to discuss on [social media](https://links.filiphric.com).