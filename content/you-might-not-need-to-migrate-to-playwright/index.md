---
title: "You might not need to migrate to Playwright"
date: 2023-10-12
published: true
slug: "you-might-not-need-to-migrate-to-playwright"
description: "If you are looking for stable and fast test execution, there’s no need to jump to the newest framework. Playwright is cool, but you might be bringing the same problems to your new project on migration"
tags: ["cypress","playwright","migration","e2e"]
image: road-split_xw7ug8.png
cypressVersion:
---
You probably stumbled upon articles recently, showing off successful migrations from Cypress to Playwright. Some showcasing massive improvements in test execution time and other benefits. These articles are great examples of success stories.

It’s no surprise, Playwright is an impressive tool. While I’m still a big fan of Cypress and prefer it for most projects, there’s no denying that Playwright seem to offer benefits that many engineers long for. I’ve been hearing many anecdotes about migrating whole Cypress projects into Playwright. Even my friends from my former employee Slido decided to do this.

So is it time to move to Playwright? Personally, I don’t think it is worth jumping on the hype train.

Don’t get me wrong, if you have experience with Playwright and you work faster, write more stable tests, then by all means go for it. Just make sure you are aware what you are signing up for.

I’d like to discuss some of the issues that you might consider 

## Migration cost
Any framework migration is going to cost a lot of time and a lot of money. You need to weigh this in to your current maintenance cost. Let’s say that your current split is 30% test creation and 70% test maintenance. Your maintenace will probably grow up to 90% or even full 100% for a certain period of time. Bigger teams will probably handle this better than smaller ones, but even those will take a significant performance cost.

