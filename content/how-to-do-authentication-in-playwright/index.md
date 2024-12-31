---
title: "How to do authentication in Playwright"
date: 2024-12-10
published: true
slug: "how-to-do-authentication-in-playwright"
image: "authentication_playwright_bzadai.png"
description: "Learn different approaches to handle authentication in Playwright, from basic login sequences to advanced techniques like session storage and API auth."
tags: ["playwright", "authentication"]
playwrightVersion: "1.49.0"
---

Authentication is usually the first hurdle to overcome when setting up test automation. Depending on how complicated the authentication method is, it can be a daunting task. Let’s start with a simple example of a login sequence.

```ts [login.spec.ts]
import { test, expect } from '@playwright/test';

test("login", async ({ page }) => {  
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
});
```

## Abstracting the login sequence
Since this is a sequence that will probable need to be repeated in multiple test, we can extract it into a separate block. This could be a function module, or a page object.

### Function module
In case of a function, the module might look like this:

```ts [login.ts]
export const login = async (page: Page) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
}
```

We can now use this function in our test.

```ts [login.spec.ts]
import { test, expect } from '@playwright/test';
import { login } from './login';

test("login", async ({ page }) => {  
  await login(page);
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
});
```

### Page object
As Playwright encourages the use of page objects, we can create one that might look like this:

```ts [login.ts]
export class LoginPage {
  constructor(private page: Page) {}

  async login() {
    await this.page.goto('/login');
    await this.page.getByLabel('Email').fill('test@example.com');
    await this.page.getByLabel('Password').fill('password');
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page.getByText('Welcome, Filip!')).toBeVisible();
  }
}
``` 

This page object can now be used in our test. We’ll need to create an instance of it and call the `login` method. This approach is simplistic, in a real world scenario you’ll likely pass different login parameters and make the page object more flexible.

```ts [login.spec.ts]
import { test, expect } from '@playwright/test';
import { LoginPage } from './login';

test("login", async ({ page }) => {  
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
});
```

## Storing browser state
However, there are some problems with these approaches. While we stick to the DRY principle in terms of the code, when it comes to execution, we are repeating ourselves over and over. Each test will navigate to the login page, fill in the form, click the login button and then check if the login was successful.

With modern web testing tools such as Playwright this is no longer inevitable. We can capture the authentication state and reuse it in multiple tests. To do this, we’ll use two parts of Playwright’s API that help us with this: `context.storageState` and `test.use`.

The `context.storageState` is a property that allows us to store the browser state. It can either be saved to a separate file or returned from the funtion to be saved in a variable. A simple demonstration of how this works:

```ts [login.spec.ts]
import { test, expect } from '@playwright/test';

test("login", async ({ page }) => {  
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth.json' }); 
});
```
This will save the browser cookies and local storage state to a file in the `playwright/.auth.json` file.

This file can then be reused in multiple tests. The `test.use` function is a hook that allows us to use the authentication state in our tests. 

```ts [login.spec.ts]
import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth.json' });

test("login", async ({ page }) => {  
  await page.goto('/login');
  await expect(page.getByText('Welcome, Filip!')).toBeVisible();
});
```

> ### Watch out!
> If you save your browser state to a file, you need to make sure that the file or the folder is not committed to your repository. This file contains sensitive information. Use `.gitignore` to ignore the file or the folder:
> 
> ```plaintext [.gitignore]
> playwright/.auth.json
> ```

## Global setup
Since the majority of tests will need authentication we can create a setup file that act as a dependency for all of our tests. This way we can include the setup globally and not have to repeat it in each test. It’s a good practice to distinguish this setup file from specs by using the `.setup.ts` extension instead of `.spec.ts`. Setup files will then become a good place for all the logic that’s responsible for setting up the state, data or other dependencies for the tests.

```ts [auth.setup.ts]
import { test as setup, expect } from '@playwright/test';

setup("user authentication", async ({ page }) => {  
  await page.goto('/');
  await expect(page.getByTestId('cookie-consent-message')).toBeVisible();
  
  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(page.getByText('Cookie Preference Saved')).toBeVisible();
  
  await page.context().storageState({ path: 'playwright/.auth.json' });
});
```

Once the setup file is created, we can set it up as a dependency in `playwright.config.ts`. The logic goes as follows:

1. The `setup` project is used to run the setup file. This will run our `auth.setup.ts` file which creates the `playwright/.auth.json` file with the browser state (lines 6-9).
2. The `chromium` project depends on the `setup` project, therefore it will run the setup file before running the tests (line 16).
3. The `chromium` project is used to run the tests and will use the `playwright/.auth.json` file as the browser state (line 14).

```ts [playwright.config.ts] {6-9,14,16}
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: './playwright/.auth.json' 
      },
      dependencies: ['setup'],
    },
  ],
});
```

Note that if you want to try this in `--ui` mode, you need to make sure you’ll have the `setup` project checked in the `projects` list otherwise it will be skipped. This might be obvious to experienced users, but it didn’t occured to me when I was first trying to set it up (headless mode works fine, because it runs all projects by default).

![playwright ui](playwright_ui_projects_jhk2f.png)

The approach with setup file works really well because you’ll also test your login flow. Once that is working Playwright moves on to other tests. But there might be more cases where you don’t want to be logged in. For these tests you can simply fall back to the `test.use` hook and reset the state for current test.

```ts [redirect.spec.ts] {4}
import { test, expect } from '@playwright/test';

// Reset the state for current test
test.use({ storageState: { cookies: [], origins: [] } });

test("redirected to login", async ({ page }) => {  
  await page.goto('/home');
  await expect(page.getByText('Please login to continue')).toBeVisible();
});
```

Storing state and reusing it in multiple tests is **the** best way to handle authentication. It reduces the time to execute tests and even makes them more reliable. If your application is secured against brute force attacks (as it should be), you will limit the number of requests to your login endpoint. This creates less strain on your backend, but also means that you have lesser chance to get locked out by captcha or other security measures.

Hope you like this blogpost. If it helped you, please share it with your friends and colleagues. If you have any questions, please feel free to reach out to me on my [social media profiles](https://links.filiphric.com).