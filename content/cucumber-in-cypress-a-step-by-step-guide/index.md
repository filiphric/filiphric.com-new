---
title: "Cucumber in Cypress: A step by step guide"
date: 2023-03-21
published: true
slug: "cucumber-in-cypress-a-step-by-step-guide"
description: "A detailed guide on how to set up cucumber-preprocessor, run your feature files, organize your tests, filter them by tags and set up an HTML reporter."
tags: ["cucumber", 'gherkin', 'cypress', 'tags']
image: 'cucumber_vyqvvt.png'
cypressVersion: v10.0.0
---
One of the most common questions I get on webinars and livestreams is: *How do I use "X" in Cucumber?*. Whether it is API testing, `cy.session()` or other functionality, Cucumber seems to be a requirement in many teams.

Main advantage of using Cucumber is the ability to use Gherkin syntax for test definitions. All tests are written as behavior scenarios and therefore test not only fulfill the role of veryfing the functionality, but also serve as a living documentation. The goal of such approach is to provide more visibility into what’s being tested. The benefit is that besides engineering, another company stakeholders can review whether acceptibility criteria is being met.

I’ve seen this approach work well in medical and banking sector, where tests were not only functional, but were further used to generate documentation or provide a high level report.

## My thoughts on using Cucumber
I have been known for criticising the Gherkin syntax approach in the past. My main objection to this is that it uses "black-box" approach to testing. I find this approach to not be very effective - especially with Cypress. 

Cypress tests are executing inside browser, giving you the ability to enter application’s internals, accessing API, caching sessions, changing application’s state, mocking network. Well designed Cypress tests can help you achieve a decent coverage with a small amount of tests.

Using a black-box approach throws away all the powers of Cypress and uses it simply as a test automation tool. 

There’s also a question of maintenance and readability. Cypress commands are readable out of the box, and with some good practices applied, you can keep your tests lean and easy to maintain even with applications that change their behavior on a regular basis.

Cucumber uses step-based definitions that encapsule each series of commands into its own file. While they can also have a good readability, any change introduced to the application might require multiple steps to be redefined or added. This means that the bigger the system the harder it might be to introduce new changes. I’ve had a [great explanation provided by Gleb Bahmutov](https://www.youtube.com/watch?v=Fd_1GHSHWHo) on how introducing a change into Cucumber-based test might be challenging.

That all said, I wanted to create this tutorial so that you can effectively set up Cypress with Cucumber in case this is a requirement in your company. I still believe you can be successful even with this abstraction model, so let’s dive into it.

## Installation

To start off, you need to install the [cypress-cucumber-preprocessor plugin](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor). There are currently multiple different versions flowing, but I believe this one is the best and it is actively maintained. You can install it by running the following command:

```
npm i @badeball/cypress-cucumber-preprocessor
```

Besides installation of the preprocessor, [plugin docs](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md) recommend installing the [esbuild bundler by Gleb Bahmutov](https://www.npmjs.com/package/@bahmutov/cypress-esbuild-preprocessor), which will make your run much faster.

```
npm i @bahmutov/cypress-esbuild-preprocessor
```

After installation of these packages, you need to configure Cypress to use the plugins. The final configuration will look something like this:

```ts [cypress.config.ts]
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
```
There’s a lot to unpack here, so let’s go step by step.

The configuration file is written in TypeScript. A Javascript file might be a tiny bit simpler, but essentially contains all the same parts. We are importing different packages and adding them into our `setupNodeEvents()` function.

The `specPattern` attribute tells Cypress that we want to be looking for `.feature` files in our `e2e` folder. This means that it will ignore all other formats and only use `.feature` files as our test.

`addCucumberPreprocessorPlugin()` function takes care of digesting these `.feature` files and convert them into Javascript. Since Cypress runs in browser, we need to make sure that everything we run (whether it is `.ts` files `.jsx` or other formats) will eventually get compiled into plain Javascript. This is what preprocessors do.

The `on("file:preprocessor")` part takes care of combining the esbuild plugin with the cucumber plugin so they play nicely together. 

The final `return config` statement makes sure that everything we have set up will actually be set into our config. This step is oftentimes forgotten, so if your plugins ever behave as if they are not installed at all, check for this return statement.

>Since the compilation into Javascript is an important part of working with `.feature` files, usually the intitial setup is the biggest hurdle to overcome. I find the [setup from the docs](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md) the easiest one to work with, but if you are working with some other bundler, such as Webpack or Browserify, [you can find examples here](https://github.com/badeball/cypress-cucumber-preprocessor/tree/master/examples).

Now that we have the plugin installed and configured, let's explore how to write tests.

## Test Scenarios and Steps

Let's start by writing a simple test scenario in Gherkin syntax. Create a new file `cypress/e2e/board.feature` and add the following content:

```gherkin [cypress/e2e/board.feature]
Feature: Board functionality

  Scenario: Create a board
    Given I am on empty home page
    When I type and submit in the board name
    Then I should be redirected to the board detail
```

Now, we need to create step definitions for each step in the scenario. The easiest way to define our steps is to create a new file called `board.ts` in the `cypress/e2e` folder, that may look something like this:

```ts [cypress/e2e/board.ts]
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on empty home page", () => {
  cy.visit("/");
});

When("I type and submit in the board name", () => {
  cy.get("[data-cy=first-board]").type('new board{enter}');
});

Then("I should be redirected to the board detail", () => {
  cy.location("pathname").should('match', /\/board\/\d/);
});
```

You can place your `board.ts` definition file into `cypress/e2e` folder, or choose a different name and put it into `cypress/e2e/board` or into `cypress/support/step_definitions` folder and cucumber preprocessor will automatically pick them up. For a custom path, you need to put explicitly state this in the configuration. We’ll get to the configuration later in this post.

> To improve your experience when writing tests in VS Code, I recommend installing the [extension by Alexander Krechik](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete). It will give you proper highlighting in `.feature` files and easy access to step definitions.

## Adding Parameters to Step Definitions

Step definitions can accept parameters, allowing you to create more flexible and reusable test scenarios. Let’s rewrite our previous step definition file so that we can pass a board name of our own to our test:

```ts [cypress/e2e/board.ts]
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on empty home page", () => {
  cy.visit("/");
});

When("I type in {string} and submit", (boardName) => {
  cy.get("[data-cy=first-board]").type(`${boardName}{enter}`);
});

Then("I should be redirected to the board detail", () => {
  cy.location("pathname").should('match', /\/board\/\d/);
});
```

The parameters are automatically passed to the corresponding step definition functions as arguments. Check out the `{string}` in the step definition. This will actually check whether we are passing the proper type into our step.

Let's now create a scenario in our `cypress/e2e/board.feature` file that accepts the `boardName` as a parameter. It will look a little something like this:

```gherkin [cypress/e2e/board.feature]
Feature: Board functionality

  Scenario: Create a board
    Given I am on empty home page
    When I type in "my board" and submit
    Then I should be redirected to the board detail
```

## Data driven testing
Another important concept in the cucumber that you should know are data tables. `DataTable` in Gherkin syntax allows you to pass a table of data to a step, making it easier to handle multiple data sets in your test scenarios. This is particularly useful for data-driven testing, where you want to test the same scenario with different sets of input data.

Data tables are defined in the `Examples` section of your `.feature` file. Let’s continue with our previous file:

```gherkin [cypress/e2e/board.feature]
Feature: Board functionality

  Scenario: Creating a <listName> list within a board
    Given I am on empty home page
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
      | boardName | listName |
      | Shopping list | Groceries |
      | Rocket launch | Preflight checks |
```

With `Examples` steps defined, you’ll run your test multiple times, passing different data with every step. Notice how we create variables `boardName` and `listName`, wrap them in `<>` to be passed as parameters into our step definitions.

## Working array of data
These data tables can also be used to feed data into a single step as shown in the following example:

```gherkin [cypress/e2e/board.feature]
Feature: Creating cards functionality

  Scenario: Create multiple cards
    Given I am in board detail
    When I create cards with names
    | Milk | Bread | Butter | Jam |
    Then 4 cards are visible
```

The step however needs to be able to digest the datatable. This is how you can make it work:
```ts [cypress/e2e/cards.ts]
When("I create cards with names", (table: DataTable) => {
  cy.get('[data-cy="new-card"]')
    .click()

  table.raw()[0].forEach(item => {

    cy.get('[data-cy="new-card-input"]')
      .type(`${item}{enter}`)

  })
});
```

The `table.raw()[0]` function will return the first line (`[0]`) of the table as an array. Inside the step definition, we are looping over this array to create items in the list.

## Grouping tests
In addition to `Given`, `When`, `Then` and `And` keywords, there are some other ways of how to organize multiple tests in a single `.feature` file. Our test so far has been creating a new board and a new list, but let’s change our test slightly and create one test that will just create another board and put it in front of our existing test:

```gherkin {3-6} [cypress/e2e/board.feature]
Feature: Board functionality

  Scenario: Opening a board
    Given I am on empty home page
    When I type in "<boardName>" and submit
    Then I should be redirected to the board detail

  Scenario: Creating a <listName> list within a board
    Given I am on empty home page
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
    | boardName | listName |
    | Shopping list | Groceries |
    | Rocket launch | Preflight checks |
```
Similarly to `describe()`, `context()` and `it()` blocks in Mocha, we can further organize our tests and group them into logical clusters. `Feature` keyword acts as a `describe()` block and serves as top level group. 

Inside a `Feature` scope, you can add a `Rule` block, that would further split your scenarios into sub-groups.

As you test different scenarios, you can add a `Background` step, that will act sort of like a `beforeEach()` hook in Mocha and run a sequence of steps before every scenario. We can abstract our `Given` and `When` steps from our current `.feature` file and make our test a little bit cleaner.

Together with a `Rule` keyword, our test can look a little something like this:

```gherkin [cypress/e2e/board.feature]
Feature: Board functionality

  Rule: Happy paths

  Background: Empty board page
    Given I am on empty home page

  Scenario: Opening a board
    When I type in "new board" and submit
    Then I should be redirected to the board detail

  Scenario: Creating a <listName> list within a board
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
    | boardName | listName |
    | Shopping list | Groceries |
    | Rocket launch | Preflight checks |
```

## Using hooks
While there is possibility to add `Background` we can still define a `Before` and `After` steps, that act like `beforeEach()` and `afterEach()` hooks in Mocha. Failure in these will not make your tests fail as they are actually running inside your tests.

`Before` and `After` steps are part of your step definition file, which means you don’t need to add them into `.feature` file.

```ts {3-6} [cypress/e2e/board.ts]
import { When, Then, Given, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  // reset application
  cy.request('POST', '/api/reset')
})

Given("I am on empty home page", () => {
  cy.visit("/");
});

When("I type in {string} and submit", (boardName) => {
  cy.get("[data-cy=first-board]").type(`${boardName}{enter}`);
});

When("Create a list with the name {string}", (listName) => {
  cy.get('[data-cy="add-list-input"]').type(`${listName}{enter}`);
});

Then("I should be redirected to the board detail", () => {
  cy.location("pathname").should('match', /\/board\/\d/);
});
```

## Test tagging

Tags are a powerful feature in Cucumber syntax that allows you to categorize and filter scenarios. You can use tags to run specific scenarios or exclude scenarios from the test run.

To add tags to your scenarios, simply prefix the scenario or feature with an @ symbol followed by the tag name. For example, let's add a @regression tag to the successful login scenario in the cypress/e2e/board.feature file:

```gherkin {8} [cypress/e2e/board.feature]
Feature: Board functionality

  Rule: Happy paths

  Background: Empty board page
    Given I am on empty home page

  @smoke
  Scenario: Opening a board
    When I type in "new board" and submit
    Then I should be redirected to the board detail

  Scenario: Creating a <listName> list within a board
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
    | boardName | listName |
    | Shopping list | Groceries |
    | Rocket launch | Preflight checks |
```

To run tests with a specific tag, use the following command:

```bash
npx cypress run --env tags="@smoke"
```
This will skip the tests that do not contain the `@smoke` tag. 

![tests filtered by tag using cucumber](skipped_tests_ity6mw.png)

You can also test this on `open` mode using the same command but with `open` instead of `run`.

In addition to running all tests with certain tag, you can pass a `not` keyword to run all tags exept specified one.

```bash
npx cypress run --env tags="not @smoke"
```

There’s also a way of running all tests that contain either one of tags:
```bash
npx cypress run --env tags="@smoke or @regression"
```

Or tests that contain both:
```bash
npx cypress run --env tags="@smoke and @regression"
```

To speed up the test execution, you can use `filterSpecs` and `omitFiltered` options that work similarly to how `@cypress/grep` plugin works. You can enable this functionality by adding following options into your `cypress.config.ts` file:

```ts {22-25}
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    env: {
      omitFiltered: true,
      filterSpecs: true
    },
    fixturesFolder: false,
    baseUrl: 'http://localhost:3000'
  },
});
```
## Configuration
There are two way of how you can modify the default configuration of the Cucumber preprocessor. You can either create a `.cypress-cucumber-preprocessorrc.json` config file that may look like this:

```json [.cypress-cucumber-preprocessorrc.json]
{
  "stepDefinitions": [
    "cypress/e2e/[filepath]/**/*.{js,ts}",
    "cypress/e2e/[filepath].{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}",
  ]
}
```

Or set everything up right in your `package.json` by adding the equivalent:

```json [package.json]
// rest of file skipped for brevity
"cypress-cucumber-preprocessor": {
  "stepDefinitions": [
    "cypress/e2e/[filepath]/**/*.{js,ts}",
    "cypress/e2e/[filepath].{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}",
  ]
}
```
>The settings from examples are defaults. Unless you want to change anthing, there’s no need to add this to your project.

## Reporting
Cucumber plugin for Cypress comes with a variety of options for setting up reporters. I’m goint to show you the simplest one - HTML reporter.

Pretty much all you need to do is to set up your configuration:

```json
{
  "html": {
    "enabled": true
  }
}
```

After you run your test, you will get a nicely formatted HTML report that looks like this:

![HTML report for Cucumber in Cypress](cucumber_cypress_report_bnnddf)

If you need a more advanced output that you later want to parse and feed into your own reporting system, I recommend checking out `json-formatter` [directly from cucumber authors](https://github.com/cucumber/json-formatter). You will need to install it separately and set it up to run in your configuration file.

## Final thoughts
As I mentioned in the beginning, there are more effective ways of using Cypress. Doing everything in your end to end tests using UI is a slight overkill and given the design of Cypress, you can unlock much more power by using it the way it was intended.

However, I hope you found this blogpost useful if you are going to use Cucumber with Cypress. If you have any additional questions, feel free to reach out to me on [Twitter](https://twitter.com/filip_hric/) or on [LinkedIn](http://www.linkedin.com/in/filip-hric). It would mean a world to me if you share this blogpost further.