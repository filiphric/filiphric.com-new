---
title: "How to structure a big project in Cypress"
date: 2023-02-01
published: true
slug: "how-to-structure-a-big-project-in-cypress"
description: "Opinion on how a project with +2000 tests should be structured in order to achieve good maintainability, speed and lower the risk of introducing regressions."
tags: ["cypress","project","structuring","library"]
image: big_project_nqcsts.png
cypressVersion:
---
Cypress will give you a project structure out of the box, but as the project grows, there are different files introduced into it that need their place. Also, there’s an ever-growing debate on whether use page-objects, and if not, what should be the alternative. In this blogpost I would like to share my view on how a successful project should be created and structured. This is based on my almost 7 years of experience building different projects with Cypress.

## Fundamentals and principles
First of all, let’s talk about some of the principles on which my thoughts are based on. These formed the decisions that I have made on my previous projects and that are vital to making the project successful. In other words, not everything mentioned here may apply to every project. It is kind of given, but I still want to mention this, just to make sure to avoid "this would not work for us" response. So here they are:

**QA automation should be a part of source code repository.** Test automation, (and especially when using Cypress), should not be detached from source code of the tested application. This keeps all tests and all branches in sync with development, makes it easier to do continuous delivery. This also means that developers are invested in creating and maintaining test automation as well as testers.

**Readability is (the most) important decision maker.** Having a failed test might not be enough to identify what went wrong. Testers are information providers. This means that if a failed test does not provide enough information on what happened or why it happened, that tester did not do a good job. When writing a test, readability of the test should drive every test design decision. 

**Testing should improve speed of delivery, not slow it down.** Our users don’t care about how fancy our tests are, but what value does the product bring to them. For a successful company it is important to bring that value and to bring it fast. What this means for testing? It should start early and test automation has to be as fast as possible. Slow debugging and slow testing means slow delivery, that’s why test automation should be optimized for speed. 

**Human time is more expensive than machine time.** Saving costs on CI is generally a good thing and writing test automation can speed things up. But there’s a limit to how much time you want to spend on it. It is important to choose your battles and make sure that creating a test automation will actually save you time. Everything you build will need maintenance, and it’s important to think about that, especially when deciding between building a tool vs. paying for a solution.

If you find yourself disagreeing with these principles, it’s OK. This does not mean that I think you are making bad decisions with your tests. I’m sure you are doing good, but maybe working with a different context. As a result, this forms different principles and drives different decisions. This will always be a reality in tech, especially given how diverse are applications of tech.

> IMPORTANT NOTE: Having said all this, I’m not 100% set on everything. As time goes by and I gain more experience, I adjust my views and apply different principles. Feel free to [discuss this with me on Discord](https://discord.com/invite/3MdvPfT), I will be happy to learn about your insights to this.

## BDD without Cucumber
Tests I write often reflect a certain behavior or describe how a certain feature is used. When I started creating test automation, we had 15 most important scenarios written down with my colleague and we would race each other into who completes them faster (she - manually, or me running test automation). 

This has basically made our test automation behavior driven, although we have never decided to go with Cucumber syntax. The simplicity of Cypress commands was good enough solution for us and made it quite apparent what the test is doing. Early enough, I have found this tweet by [Kent C. Dodds](https://twitter.com/kentcdodds) that we decided to live by:

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">The more your tests resemble the way your software is used, the more confidence they can give you.</p>&mdash; Kent C. Dodds 🌌 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/977018512689455106">March 23, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This meant we wanted our tests to follow a certain scenario and then grouped scenarios into features. A result of such test structure looked something like this:

![Folder structure](e2e_gjcomh.png){customClass="w-1/2"}

Folders represent a certain feature and spec files inside those folders would represent a behavior or a user story that this scenario would cover. As mentioned, these scenarios represent real user behavior, but are not written in Gherkin syntax (Given, When, Then) or using Cucumber framework. Although open source community around Cypress has created a Cucumber preprocessor that allows you to write your test like this, I generally lean away from this solution. 

In my opinion it adds an unnecessary layer inbetween test code and the application. This slows down test creation and adds unnecessary maintenance. Before you can write a complete test, every step definition needs to be created first. Every new step needs at least one new step definition unless we are creating just a different combination of existing steps. But in that case, there’s no real value in adding such test to existing test suite as all steps have already been covered.

That being said, BDD approach has brought a focus on user behavior, which I definitely agree with. In my opinion, Cypress commands are already behavior focused, as most of the commands read like a sentence:

```js
  cy.visit('/my-page')
  cy.get('#element').click()
```

## Test annotation
As mention at the beginning, readability is really important. This helps navigation through tests simple. While it may seem like a small detail, it is actually really valuable when you need to debug a test. When writing an `it()` block, the name of the test should give you enough information about what is the test scenario. Some good and bad examples:

```js [❌ don’t do it like this]
it('board is visible', () => {})
it('works in edge cases', () => {})
it('handles input', () => {})
```

```js [✅ much better]
it('creates a board and navigates to board detail', () => {})
it('throws error when trying to access private board', () => {})
it('shows a warning message when input is empty', () => {})
```
Ideally you should write your test title in such a way that you can imagine what the test is doing without looking into its content. Once my colleague recommended that the `it` and the name of the test should read like a sentence. I really like this approach although I have found cases where that was counterproductive and would push me into weird test namings. Don’t overcomplicate stuff and if a rule needs to be broken, break it.

Another useful way of making tests more readable is to add your own custom logs. Gleb Bahmutov has a [useful plugin for logging into terminal](https://github.com/bahmutov/cypress-log-to-term), which can be definitely help with test annotation. I personally like to customize my `cy.log()` command to print out information into my timeline. [I’ve written a blogpost about this](/improve-your-error-screenshots-in-cypress), feel free to read about this in more detail. I plan to make a plugin out of this, but here’s basically what it does:
- every cy.log() describes a step in a test
- numbers are automatically generated
- when a test fails numbered list is appended to the error message
- the error message is printed on the failure screenshot as well as in terminal

![Cypress timeline with annotated steps and error output](steps_annotation_cp54tm.png)

## Spec files
Every spec file should contain just a handful of tests. End to end tests tend to be longer, which means dealing with more lines of code. Once you have multiple longer scenarios in your spec file, it may quickly become harder to navigate through.

I also rarely decide to use `describe()` blocks, as the real value of these blocks comes in when you have at least two in a single spec file. `describe()` blocks help group together tests that have something in common. Most of the time it’s `before()`or `beforeEach()` hooks. This is why in cases when I need to split the groups, I usually split them with a new spec instead of new `describe()` block.

However, there is a problem with this approach when you try to use "Run all specs" button in Cypress open mode. This mode basically creates a single spec out of multiple files, which means that all your `before()` and `beforeEach()` hooks get concatenated causing unexpected results. This is something to be aware of. When working on a big project however, I practically never run all specs through open mode.


## Selectors
I have tried different approaches in the past, but I ended up going with [Cypress’ recommendation](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) and add `data-cy` selectors into the application. This has proven to be the most stable approach. Relying on class names has always led to random failures. This was especially true these days as developers rely on UI libraries such as material design or bootstrap. Updating these can often cause a change in classes, which breaks our tests.

There’s also a big chance for not selecting the correct element. Imagine that you have a button that looks like this:

```html
<button disabled>
  <span>Click me!</span>
</button>
```

In your test you want to click in this element. But here’s the catch. Button has the `disabled` property, which means a real user would not be able to click on it. This means that targetting the correct element becomes super important:

```js
// this will pass, but click will do nothing
cy.get('span').click()

// this will fail, because button is disabled
cy.get('button').click()
```
Of course, if we are trying to click on a disabled button, the test **should** fail, because a real user would not be able to do this interaction. This is why choosing the right selector is not only a matter of clicking on the right place in our application. It’s also a matter of understanding where does the interaction happen.

This is why it’s also important to be able to add your `data-*` attributes yourself. You will get a better understanding of the structure of the app and also get yourself familiar with different frameworks. Also, I don’t find it particulary useful when the addition of `data-*` selector is outsourced to developers. This prolongs the feedback loop and adds unnecessary overhead.

Another advantage of adding your own selector attributes to the source code is that it removes the duplicity that is created when using page objects. Same goes for storing your elements in a separate file. It is another concern to be taken care of and a de-sync between the reality of the application and tests can happen easily.

Adding `data-*` selectors can also help you improve readability of your tests, as you can add anything that makes sense for the test you want to write. Some people I talk to are concerned about a naming convention, but I would not worry about it. Having two of the same `data-*` attributes is not a problem until they are found within the same test or within the same screen. I’d definitely advice for using selectors that represent what user sees, instead of trying to come up with a naming convention that would embrace every selector in tested app.

```js [my recommendation]
// ❌ too complicated in my opinion
cy.get('[data-cy=account-screen-sidemenu-settings-modal]')
// ✅ much better
cy.get('[data-cy=settings-modal]')
```

Another question that I see raised more often is the usage of [Cypress testing library](https://testing-library.com/docs/cypress-testing-library/intro/). Personally I haven’t been using it a lot, but I see the value in using it. This library often pushes you to rely on accessibility attributes, which means you test two things at once. Not only you check functionality of your app, but you make sure that it’s accessible as well.

Most importantly, you can use multiple selector strategies that complement one another. [This amazing blogpost by Mark Noonan](https://css-tricks.com/front-end-test-element-locators/) demonstrates how different levels of testing strategies can work together to create a very stable test suite.

I have experimented with [mapping all of the selectors and making them autocomplete](https://filiphric.com/autocompleting-selectors-in-cypress-with-typescript), but this strategy does in fact rely on a single type definition file which stores all selectors. In theory I can imagine that this might work, but but currently I’m more leaning to this strategy being a dead end. But you be the judge.

## Custom commands
Custom commands are one of the most powerful features of Cypress. The fact that you can expand your library makes Cypress ecosystem super powerful. I usually use three categories of custom commands:
- utilities
- API calls
- action sequences

These usually live in their own folder in the Cypress project:

![Commands folder in project](commands_tszoun.png){class=w-1/2}

This structure feels right for me, although with pre v10 versions of Cypress I used to put the folder in `cypress/support` folder. 

* custom commandy
* tagy
* globálne hooky
* config, seeding/account creation
* utility
* typescript
* reporting