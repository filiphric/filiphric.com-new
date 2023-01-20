---
title: "Cypress.io and GitHub Actions: A step by step guide"
date: 2023-01-16
published: true
slug: "cypress-and-git-hub-actions-step-by-step-guide"
description: "GitHub Actions are a powerful and easy-to-learn tool that can help you quite a lot, In this blogpost we‘ll take a look into how they can be used to run your Cypress tests."
tags: ['cypress', 'ci', 'github', 'actions']
---
You might have wondered about GitHub Actions. They seem like an advanced concept, but in reality they are a powerful and easy-to-learn tool that can help you quite a lot. Let’s look at how to use them to run your Cypress tests.

## Understanding what to do
Let’s first take a look at what we are trying to achieve. The goal here is to run Cypress tests using GitHub Actions. In order to do that, we need to take a look at the repository we are working with. I will be using my trelloapp project as an example. 

Whenever I test my application locally, I need to do two things:
1. run my application on localhost
2. run my tests against that localhost

In order to do this on GitHub action server, I first need to spin up my project, and install everything I need. I also need to define on what occasion I want to run my tests (e.g. run them on demand, or run them whenever new code is pushed). This slowly shapes up the plan for how the GitHub action will look like. These plans are called "workflows" in GitHub Actions. 

## Creating a workflow
Let’s now create a workflow file. Its place is in `.github/workflows` folder:

![GitHub workflows folder](github-workflow.png)

This is where GitHub Actions will look for your workflow files. These files are in YAML format and you can think of them as recipes for what GitHub actions should do. They tend to be quite linear, although [there are ways to write conditional logic](https://docs.github.com/en/actions/using-jobs/using-conditions-to-control-job-execution) in them.

```yml
name: e2e-tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          start: npm start
```
Let’s break down what’s happening in this file. On the first line, we are giving our action a name. It can be anything, but it never hurts to be descriptive.

Our second line defines an event that the given scenario should run against. There’s a variety of different events like `push`, `pull_request`, `schedule` or `workflow_dispatch` that allows you to trigger the action manually. You can find the full list in the [GitHub Actions documentation](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on).

The third line defines the job or jobs that need to be ran. This is where we need to define what needs to be done. If we were to start from scratch, this is where we would do `npm install` to install all dependencies, spin up the application and run our tests against it. But as you can see, we are not starting from scratch, but using pre-defined actions.

This is one of the superpowers of GitHub actions. Instead of building everything ourselves, we can use previously created macros and have things handled for us. For example `cypress-io/github-action@v5` will run `npm install` for us, properly cache Cypress (so that next time the installation is rapidly faster), run our application using `npm start` command and run `npx cypress run` command for us. All this with just four lines in our YAML file.

We’ll talk about different configurations for the Cypress GitHub Action, but let’s back up for just a moment to mention some details in our `cypress-run` job. The `runs-on` parameter defines [what kind of machine](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#choosing-github-hosted-runners) we want to use for our tests. The `actions/checkout@v3` might feel a little odd - why checkout the project we are currently working on? The reason is quite simple actually. There are many things we can do with GitHub action that don’t include checking out the repository. For example [sending a Slack notification](https://github.com/marketplace/actions/slack-notify) whenever new code is pushed to a remote branch.

Let’s now focus on how we can use GitHub actions to improve our workflow.

## Trigger test run manually

Instead of running your test on every push, you can choose to run your test on demand. The setup file will look like this:
```yml
name: e2e-tests
on: [worfklow_dispatch]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          start: npm start
```

Once you set up your file like this, you can go to GitHub and under "Actions" tab run your `e2e-tests` workflow manually.

![Trigger test run manually](workflow_dispatch.png)

## GitHub actions and Cypress Cloud
Cypress Cloud (formerly Cypress Dashboard) is a service for recording your Cypress test results. It offers a bird’s eye view of your tests, so that you can analyze and maintain your tests more effectively. Recording the results to the Cypress Cloud service is quite simple. As a first step, you need to connect your project to the service. This is done right in your Cypress open mode.

![Connect your project to Cypress Cloud service](connect_cloud.mp4)

This step will generate a unique key, that will be used to authorize GitHub Actions to communicate with Cypress cloud. Copy this key, and add it to environment in your GitHub Project as `CYPRESS_RECORD_KEY`

![Store Cypress key in GitHub actions](github_secret.mp4)

As last step, we need to edit the workflow file:

```yml {13-15}
name: e2e-tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          start: npm start
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```
This will enable recording results to Cypress Cloud and add the Cypress key into the environment so our Cypress run can use it. 

Having results recorded to Cypress Cloud gives you some amazing capabilities. You can see screenshots and videos from Cypress run that can help you debug your tests, or you can look at long term analytics and check the health of your test suite. Additionaly, there are some useful integrations. If you don’t want to switch between Cypress Cloud and GitHub all the time, you can have your test results sent right into GitHub.

![GitHub integration](github-integration.png)

After setting up your integration, your test results will get sent right into your pull request conversation and to your email.

![Integration summary](integration-summary.png)

GitHub integration will also become part of pull request checks so that you can prevent a pull request from merging if tests failed.

![Pull request checks](checks.png)

## Running tests in parallel
Cypress Cloud allows you to run your tests in parallel and once you have the project set up, it’s relatively easy to start splitting your tests across multiple machines. The configuration file will look like this:

```yml {6-9, 18}
name: e2e-tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Cypress run
        uses: cypress-io/github-action@v4
        with:
          start: npm start
          record: true
          parallel: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```
This setup will spin up three machines and run everything in our `steps` in parallel. The `parallel: true`flag will make sure that our test run will communicate with the Cypress Cloud and split all our tests in between machines. Cypress Cloud will also take care of automatic load balancing of your tests, so that your test run will take as little time as possible.

The `fail-fast` flag will make sure that GitHub will not terminate our job if there’s a failed test. If set this to true, you run the risk of leaving your test run hanging on Cypress Cloud. If you want to stop your test from continuing when there’s a failure, you can set this up in your project settings in Cypress Cloud. It even allows you to set up the number of tests that should trigger test run cancellation.

![Smart orchestration](smart-orchestration.png)

## Running in parallel without Cypress Cloud
Just as I was writing this blogpost, [Gleb Bahmutov has released a plugin](https://github.com/bahmutov/cypress-split) that allows you to run your tests in parallel without using Cypress Cloud service. It will split your specs across parallel machines just as Cypress Cloud would. The configuration is quite simple.

```yml
name: e2e-tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          start: npm start
        env:
          SPLIT: ${{ strategy.job-total }}
          SPLIT_INDEX: ${{ strategy.job-index }}
```

To give GitHub proper information, you need to set up `SPLIT` and `SPLIT_INDEX` env variables. This way each process is assigned the specs it needs. It will make the decision automatically, but there are ways to configure this [mentioned in the README file](https://github.com/bahmutov/cypress-split#list-of-specs). This is a very nice solution for situations where you don’t need Cypress Cloud or have your own reporting dashboard already set up.