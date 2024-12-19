---
title: "Introduction to testing in Vitest"
date: 2024-12-19
published: true
slug: "introduction-to-testing-in-vitest"
description: "WIP"
tags: ["unit testing","vitest","component"]
image: vitest_vusbr3.png
vitestVersion: "2.1.5"
---

Lately I’ve been playing with Vitest - a testing framework for Javascript and TypeScript apps. I’ve been playing with the tool recently and I have been positively surprised with it’s capabilities.

Typically, you’d use Vitest for unit and component test testing, but there’s much more the tool offers. In this blogpost we’ll take a look at the different features and use cases.

## Understanding the basics

If you have a background mostly in e2e testing as I do, you’ll quickly notice the main difference in the testing approach with a tool like Vitest. In end-to-end testing, you start by opening the app in the browser and following a particular user story. With Vitest, your test focuses on a specific part of your app. This part can be a component, a function or something else. The approach is usually to import that chunk of your application into a test, and verify different scenarios in isolation.

Let’s say I’m testing a status page application written in React. I have a function that returns a color based on the status of a service.

```ts [statusData.ts]
export function getStatusColor(status: Status): string {
  switch (status) {
    case "operational":
      return "bg-green-500";
    case "partial-outage":
      return "bg-yellow-500";
    case "major-outage":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
```

My testing goal would be to make sure that the function returns the correct color for each status. The test in Vitest would look like this:

```ts [statusData.spec.ts]
import { test, expect } from "vitest";
import { getStatusColor } from "./statusData";

test("getStatusColor returns the correct color for each status", () => {
  expect(getStatusColor("operational")).toBe("bg-green-500");
  expect(getStatusColor("partial-outage")).toBe("bg-yellow-500");
  expect(getStatusColor("major-outage")).toBe("bg-red-500");
  expect(getStatusColor("unknown")).toBe("bg-gray-500");
});
```

The test simply verifies every possible case for this function and verifies that the return value is what we expect. For a simple function like this, the test feels simplistic, but these kinds of tests start to bring more value once we need to deal with multiple functions, imports, or once we refactor existing functionality.

## Running tests
There are couple of way to run the tests. The simplest one is to use command line:

```bash
npx vitest
```

If you are using VS Code or Cursor, there’s an extention tha allows you to run your test right inside your code editor. There’s support for other editors as well.

![VS Code extension for Vitest](vs_code_vitest_zdeg8j.png)

Vitest also comes with a very handy UI mode, that contains a dashboard for all your tests. You can run it by typing the following into the command line:

```shell
npx vitest --ui
```
![VS Code extension for Vitest](vitest_ui_uteito.png)
UI mode automatically runs in watch mode, so that anytime you change the test or the source file, test will re-run and give you immediate feedback.


## Testing components
In the same way as you test your functions, you can test your components. Let’s take a look at a component that implements these colors and contains a bit more logic. Here’s an example of a component that renders individual list item. The important thing to point out here is that this components takes in a propert called `item`. Later we will want to make sure that it is properly handled.

```tsx [historical-status-item.tsx]
import type { HistoricalStatus } from "../utils/statusData";
import { getStatusColor } from "../utils/statusData";

interface HistoricalStatusItemProps {
  item: HistoricalStatus;
}

export function HistoricalStatusItem({ item }: HistoricalStatusItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span>{item.date}</span>
      <div className="flex items-center space-x-2">
        <span className="capitalize">{item.status.replace("-", " ")}</span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
      </div>
    </div>
  );
} 
```

There’s a little bit more that we need to do in order to test our component. In order to test it, we need to render it and properly set up. For that, we‘ll install a couple of utilities that will help us with that.

```shell
npm i @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```
These utilities will expand capabilities of Vitest, add the proper testing environment and help us set up our components to be tested. Firstly, we need to add react plugin to the `vitest.config.ts` file, as well as set up the testing environment.

```ts [vitest.config.ts] {5,7}
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom'
  },
})
```

Now, everything is ready to write our test. We want to render our `<HistoricalStatusItem />` component. As we mentioned, this component requires data to be passed in. We can simply create mock data item in our test, pass it into our component and make our assertions.

```tsx [historical-status-item.spec.ts]
import '@testing-library/jest-dom/vitest' 
import { render, screen } from '@testing-library/react'
import { HistoricalStatusItem } from './historical-status-item'
import { expect, test } from 'vitest'

test('renders date and status correctly', () => {
  const mockItem = {
    date: '2023-05-30',
    status: 'partial-outage' as const
  }

  render(<HistoricalStatusItem item={mockItem} />)

  expect(screen.getByText('2023-05-30')).toBeInTheDocument()
  expect(screen.getByText('partial outage')).toBeInTheDocument()
})
```

Once we create multiple component tests, it may be worth moving some of the common stuff into its own file. A typical example of this would be `@testing-library/jest-dom` import, that will be needed everytime we want to work with a DOM element. We can move that import into `vitest.setup.ts` file and add it as a setup file to our config.

```ts [vitest.config.ts] {8}
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

## Components with managed state

```tsx [current-status.tsx]
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStatusColor, getOverallStatus } from "@/utils/statusData"
import { useStatusStore } from "@/stores/statusStore"

export function CurrentStatus() {
  const systems = useStatusStore((state) => state.systems)
  const overallStatus = getOverallStatus(systems)
  const statusColor = getStatusColor(overallStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${statusColor}`} />
          <span className="font-semibold capitalize">{overallStatus.replace("-", " ")}</span>
        </div>
        <div className="grid gap-2">
          {systems.map((system) => (
            <div key={system.name} className="flex items-center justify-between">
              <span>{system.name}</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(system.status)}`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

```tsx [current-status.spec.ts]
import { render, screen } from '@testing-library/react'
import { CurrentStatus } from './current-status'
import { expect, test, vi } from 'vitest'
import { useStatusStore } from '../stores/statusStore'
import { SystemStatus } from '@/utils/statusData'

test('renders all system statuses', () => {

  vi.mock('@/stores/statusStore', () => ({
    useStatusStore: vi.fn()
  }))

  const mockSystems: SystemStatus[] = [
    { name: "API", status: "operational" },
    { name: "Web App", status: "operational" },
    { name: "Database", status: "operational" }
  ]
  
  vi.mocked(useStatusStore).mockImplementation((selector) => 
    selector({
      systems: mockSystems,
      history: [],
      updateSystemStatus: vi.fn(),
      addHistoricalEntry: vi.fn()
    })
  )

  render(<CurrentStatus />)
  
  expect(screen.getByText('API')).toBeInTheDocument()
  expect(screen.getByText('Web App')).toBeInTheDocument()
  expect(screen.getByText('Database')).toBeInTheDocument()
})

```