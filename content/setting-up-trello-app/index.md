---
title: "Setting up trello app"
published: false
slug: "setting-up-trello-app"
image: "trello_hck6rp.png"
tags: ['cypress']
---

We are about to meet on **:WorkshopName** and I hope you are looking forward to it as much as I do 😃. These are preparation instructions that will help you out with preparation for the workshop. Please don’t delay this to the last minute, because if any problems occur, we’ll have more time to iron them out. If there’s anything that does not work, please contact me and I’m sure we’ll be able to solve it all.

## Requirements
- Node.js v16 or higher
- git v2.3 or higher
- Code editor (VS Code, Webstorm or any other)
- Terminal or other Command line interface (Bash, Zsh)

## Installation
Open your terminal or the command line and type these commands:

:WorkshopSlug

If you have ever installed a project from GitHub, this should be easy. If not, I’m sure you’ll manage. But if any problems occur, check out the troubleshooting section of this article.

## Check the installation

Once you cloned the repository and used `npm install` to install the app, you should be able to run `npm start` command. It’s best if you use a text editor for this. I will be using VS Code for the workshop, [which you can download here](https://code.visualstudio.com/download). 

Open the workshop repository folder and in the top bar click on "Terminal" and choose "New Terminal".

> 💡 TIP: You can drag and drop your folder into VS Code to open it 

![Opening terminal](terminal_n1djsl.gif)

If you have gone through the initial steps (clone, install), you should be able to run the app with `npm start` command. Make sure you are opening the terminal in the workshop folder (you can check that by typing "pwd" into your command line). You should see the following message and be able to see the application in your browser on url http://localhost:3000 
![Application running](vite.png)
You should see a running application that looks something like this:
![Application in browser](trello.png)

## Running Cypress

Open a new terminal window in your editor and open Cypress using one of these commands:
```plaintext
npx cypress open
```

```plaintext
npm cy:open
```

If at least one of them works, great 👍 You should see a window like this:  

![Cypress](cypress.png)

## Troubleshooting
If one or more checks don’t work, please reach out to me. We can make a call and solve it. It is necessary to solve all the problems before the workshop, otherwise it might be hard to get back on track. Here are couple of tips for most common issues:

### `git clone` command does not work 
If you see a message like this:
```plaintext
Fatal error: git is not installed or not in the PATH
```
there’s a good chance you don’t have git installed. [Installation instructions are here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). If everything fails, there is an alternative way. Visit the repository site, click the arrow next to the green "code" button and pick the option "download zip". Unzip the project, open it in VS Code and continue with the `npm install` step

### `npm install` command does not work
You see the error:
```plaintext
node: command not found
```
In this case, it is possible you don’t have node.js installed. Please go to [https://nodejs.org](https://nodejs.org) and install node.js according to the installation instructions. There’s a good chance you’ll need to restart VS Code after the installation

### `npm start` throws an error 
There are two possible errors here:
1. if you see an error similar to `Error: Cannot find module 'worker_threads'` then it is possible you have an older version of Node.js installed. Try checking that by typing the `node -v` command into your terminal. If it returns version older than v14, please go to [https://nodejs.org](https://nodejs.org) and install latest version of Node.js 
2. if you see an error like `'vite' is not recognized as an internal or external command` it may be that the installation didn’t go properly for Trello app. Use your terminal to go to `trelloapp` folder and trigger installation from that folder by using following commands:
```plaintext
cd trelloapp
npm install
```

### `npx cypress open` throws an error
You see something like: `Command timed out after 30000 milliseconds` - in this case, try repeating the command or turn off your VPN (if you have one). Cypress does a verification check when opened for the first time. If this takes longer than 30 seconds it will time out. 
You can also try to run the command like this: `CYPRESS_VERIFY_TIMEOUT=60000 npx cypress open` and increase the timeout

## Contact me
If for any reason something is not working, feel free to contact me via email, or DM me through [LinkedIn](http://www.linkedin.com/in/filip-hric), [Twitter](https://twitter.com/filip_hric/) or [Discord](https://discord.com/invite/3MdvPfT)

## About Trello app
This application is a project to help drive my workshops. It is a simplified real-world app, through which you can explore different testing problems. I usually add this project as a submodule in my workshops, but you can [take a look into it on GitHub](https://github.com/filiphric/trelloapp-vue-vite-ts). Trello app is written in Vue 3, TypeScript and uses a json-server as a backend.