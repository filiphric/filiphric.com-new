---
title: "How to structure a big project in Cypress"
date: 2023-02-01
published: true
slug: "how-to-structure-a-big-project-in-cypress"
description: "Opinion on how a project with +2000 tests should be structured in order to achieve good maintainability, speed and lower the risk of introducing regressions."
tags: ["cypress","project","structuring","library"]
image: 
cypressVersion:
---
Cypress will give you a project structure out of the box, but as the project grows, there are different files introduced into it that need their place. Also, there’s an ever-growing debate on whether use page-objects, and if not, what should be the alternative. In this blogpost I would like to share my view on how a successful project should be created and structured. This is based on my almost 7 years of experience building different projects with Cypress.

## Fundamentals and principles
First of all, let’s talk about some of the principles on which my thoughts are based on. These form the decisions I have made on my previous projects and that are vital to making the project successful. In other words, not everything mentioned here may apply to every project. It is kind of given, but I still want to mention this, just to make sure to avoid "this would not work for our" response. So here they are:

**QA automation should not be a silo project.** Test automation, (and especially when using Cypress), should not be detached from source code of the tested application. Tests should be part of the source code repo. This keeps all tests and all branches in sync with development, makes it easier to do continuous delivery and makes quality a responsibility of the whole team. This also means that developers are invested in creating and maintaining test automation.

**Readability is (the most) important decision maker.** Tests help us find a regressions. This means that simply having a failed test might not be enough to identify that regression. Testers are information providers. This means that if a failed test does not provide enough information on what happened or why it happened, that tester did not do a good job. When writing a test, readability of the test should drive every test design decision. 

**Testing should improve speed of delivery, not slow it down** Users care about inovation and value of the product, that’s why the speed of delivery is paramount. What this means for testing? It should start early and test automation has to be as fast as possible. This means no nighlty test runs week-long test debugging.

**Choose your battles**

and cost effectivenes is the most crucial part of testing.** Having zero bugs is not the most important thing in testing. The most important thing is to provide value to the customer. Customer is ultimately deciding on the value, therefore deciding on the quality. To build quality means to make customer happy. This also means that that the pace at which we can provide that value will dictate customer’s perception of quality. To keep up the pace and to be fast means to be effective. 5 testers may be as effective as 10. It depends on where these testers spend their time. The goal of successful test automation is to create a system which will require minimum maintenance.

If you find yourself disagreeing with these principles, it’s OK. This does not mean that I think you are making bad decisions with your tests. I’m sure you are doing good, but maybe working with a different context, which forms different principles and drives different decisions. This will always be a reality in tech, especially given how diverse are applications of tech.

> IMPORTANT NOTE: Having said all this.