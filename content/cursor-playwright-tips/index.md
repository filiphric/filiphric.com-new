---
title: "10 Tips for Writing Playwright Tests with Cursor"
date: 2025-10-13
published: true
slug: "cursor-playwright-tips"
description: "Practical tips gathered from months of writing Playwright tests with Cursor. Learn how to use project rules, workflows, screenshots, and MCP for better test automation."
tags: ["playwright", "A.I.", "testing", "cursor"]
image: "cursor_tips_buswxf.png"
cypressVersion:
playwrightVersion: 1.56.0
vitestVersion:
cursorVersion: 1.7.0
---

If you've been following the A.I. coding assistant space, you've probably noticed how fast things are moving. New models drop every month, and everyone's trying to figure out the "right way" to work with these tools. I've spent the last couple of months writing Playwright tests with Cursor, and honestly, there's been a lot of trial and error. Some things worked brilliantly, others... not so much.

I decided to gather everything I've learned into this post. Let's dive in.

## 1. Stick with "Auto" mode

This might be a hot take: you don't need to chase every new model release. I know it's tempting to go for the latest and greatest. All the models promise to be better, more efficient, and more powerful than the last. In my experience, switching from model to model made me readjust the "feel" for how a model operates.

I've found that staying in "auto" mode and letting Cursor handle the model selection works really well. You're not wasting mental energy on which model to use for which task. Just focus on writing good prompts and let the tool do its thing.

## 2. Use project rules to describe your application

This is probably the most important tip on this list. Project rules in Cursor are automatically added to context, which means they're always available when the A.I. generates code.

I use rules to describe:
- Your application architecture
- Your testing approach and philosophy
- Database scripts and setup commands
- Test commands and how to run them
- Selector conventions (data-testid vs. role selectors, etc.)
- Coding style preferences
- Project structure and where things live

Think of project rules as the manual your A.I. assistant reads before starting work. The better the manual, the better the work.

You can also split rules into separate rule files in the `.cursor/rules` folder. This way, each test file gets exactly the context it needs.

```treeview
.cursor/
└── rules/
  ├── selectors.mdc
  ├── test-structure.mdc
  └── database.mdc
```

You can also glob your rules for tests to specific `.spec.ts` files and reference files, such as your Playwright config.

## 3. Don’t download other people's rules

I tried downloading rule sets from GitHub in the beginning and I must admit that most of them weren't worth it. The main problem is that they are either too generic or designed for someone else's workflow.

Another problem is that they numb you to how your your IDE works. Which explanation works well for the LLM? Which makes it halucinate? Without writing your own rules you are losing all that learning.

Create your rules organically instead. When Cursor makes a mistake, go back to your rule file and adjust it so that you prevent it from happening again. When you find yourself giving the same instructions repeatedly, turn them into a rule.

## 4. Create custom commands

Similarly to rules, custom commands set boundaries and guardrails for the A.I. agent. They serve a different purpose though. Custom commands usually describe a certain workflow or a set of steps for the A.I. to follow given a certain task.

For example, when your tests follow Arrange - Act - Assert pattern, you can create a custom command that will describe a set of steps on how to follow this pattern.

Custom commands can be easily created by typing `/` in the chat. They are saved to the `.cursor/commands` folder. You can even use agent to generate the rule and refine details so that they reflect your coding style.

![Create custom command in Cursor](cursor_create_command.png){class="shadow-block-cheese border-black border-2"}

## 5. Reference app code

I keep telling testing community that they need to **write their own selectors instead of handing it off to developers**. The era of black box testing is over and being technically savvy is not up for a debate. As a tester, understanding the structure of the application gives you so much power, so why would you want to hand it off to someone else?

And A.I. can be a great help here. Let’s say you can't find the right component file for an element that you want to reference in your test. Simply open your browser Devtools, copy an element from the elements panel, and paste it into Cursor's chat. Since Cursor indexes your source code, you can ask it to explain stuff for you or help you locate the right file and right selector. How hard is to add your data attribute then?

> **Extra tip:** Use folder names in your prompts instead of the `@folderName` syntax or dropping folders into chat. This prevents Cursor from reading every single file in that folder, which would bloat your context window and make A.I. prone to mistakes.

## 6. Screenshots can be more helpful than text

Not sure why, but I was holding back on using screenshots for the longest time. That was a mistake.

A.I. is *amazing* at connecting visual context with code context. When you say:
- "This is my page" (screenshot)
- "This is the test I written" (reference file)
- "This is how the page looks when the test fails" (screenshot)

the A.I. suddenly understands exactly what you're trying to do. It's like the difference between describing a room over the phone versus showing someone a photo.

## 7. Learn how to use Playwright MCP efficiently

If you want to use Playwright MCP to generate your test, the results can be a bit odd and slow. I never had good results using it instead of codegen. 

I stronngly believe that **debugging** is a much better use case for this tool. Playwright already collects a lot of information about the test run. This makes it really valuable when in need of providing info to the LLM. I tried to leverage this even before Playwright came up with their own MCP server. I created my own debugging tool that could figure out what went wrong with a test. That project ended up going nowhere, because Playwright MCP is actually good enough for this use case.

If you want to debug a test that is failing you can start as simple as this prompt:
```plaintext
"This test fails on line 6. Open the browser, run the test,
and tell me what's wrong."
```

The "open the browser" part will make sure that A.I. knows that it should call Playwright MCP.

But you don’t have to stop there. You can combine multiple MCPs. For example, you can use the GitHub MCP to fetch your last CI test run, pick the failed test and then run Playwright MCP to debug the testlocally. The screenshots, traces, and snapshots provide the A.I. with exactly the right context to understand what went wrong.

## 8. Jump Outside Cursor for Planning

Cursor is a fantastic coding tool, but it’s important to understand that whenever you start a conversation with the LLM, Cursor adds a lot of its own information to it. Athough Cursor has recently implemented planning mode, I still find myself jumping outside Cursor for tasks that are not coding related.

For example I use [repomix](https://github.com/yamadashy/repomix) to bundle my source code into XML format, then paste it into Gemini (or Claude) to:
- Create project rules
- Design workflows
- Generate test plan prompts
- Create mermaid diagrams for test architecture

I find especially the prompt generation to be really useful. Whenever I’m unsure which parts of codebase are going to be relevant, this approach helps.

## 9. Testing Is More Important Than Ever

Technically not a Cursor tip, but it needs to be said.

With the rise of "vibe coding" platforms where A.I. generates entire applications, testing has become absolutely critical. Without testing, there's no way A.I. delivers good software. You can generate code at lightning speed, but if you don't verify it works, you're just moving faster toward broken software.

At [nut.new](https://nut.new), we're serious about not just writing full-stack apps, but running tests and verifying functionality. The A.I. can write the code, but it's the tests that give us confidence to ship.

If you're using A.I. to write code, you need to be using A.I. to write tests too. There's no way around it.

## 10. Get into experimental mindset

Even though I just threw 9 tips at you, it doesn’t mean that anything I said will work for you. I find myself customizing my coding experience so that it works for **me**. A tester’s mindset is golden here, we are natural at trying out new stuff, seeing what sticks and what doesn’t.

Hope this helps! If you've got your own tips for working with Cursor and Playwright, I'd love to hear them. Drop me a message on [Twitter](https://twitter.com/filip_hric) or [LinkedIn](https://www.linkedin.com/in/filip-hric/), or join my [Discord community](https://filiphric.com/discord) where we talk about this stuff all the time.

And if you found this useful, share it with your team—chances are they're struggling with the same things.

Happy testing! 🎭
