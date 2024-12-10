/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const prompts = require('prompts')

const questions = [
  {
    type: 'text',
    name: 'blogTitle',
    message: 'Add the name of the blog'
  },
  {
    type: 'text',
    name: 'description',
    message: 'Write a description of the blog',
    initial: 'WIP'
  },
  {
    type: 'list',
    name: 'tags',
    message: 'Add tags for the blog',
    separator: ','
  },
  {
    type: 'date',
    name: 'publishDate',
    message: 'When will be the blogpost released?',
    mask: 'YYYY-MM-DD',
    initial: new Date(Date.now() + 24 * 60 * 60 * 1000),
    validate: date => date > Date.now() ? true : 'Please use a date that’s in the future'
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'All looks good?',
    initial: true
  }
];

(async () => {
  const { blogTitle, description, tags, publishDate, confirm } = await prompts(questions)

  if (!confirm) {
    console.log('Exiting...')
    return
  }

  // convert the Title to the camel case and remove invalid characters
  const blogTitleSlug = blogTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/ /g, '-')

  const blogPostPath = `content/${blogTitleSlug}`

  // create a folder with the name of that slug
  fs.mkdir(blogPostPath, { recursive: true }, (err) => {
    if (err) { throw err }
  })

  const date = publishDate.toISOString().substring(0, 10)

  // create index.md and add blogpost attributes
  const data = `---
title: "${blogTitle}"
date: ${date}
published: true
slug: "${blogTitleSlug}"
description: "${description}"
tags: ${JSON.stringify(tags)}
image: 
cypressVersion:
---`

  // Use promises to ensure operations happen in sequence
  try {
    // Write the file
    await fs.promises.writeFile(`${blogPostPath}/index.md`, data)
    console.log('The file has been saved!')

    // Create and checkout new branch using child_process
    const { exec } = require('child_process')
    const branchName = `blog/${blogTitleSlug}`
    
    exec(`git checkout -b ${branchName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating branch: ${error}`)
        return
      }
      if (stderr) {
        console.error(`Git stderr: ${stderr}`)
        return
      }
      console.log(`Successfully created and checked out branch: ${branchName}`)
    })
  } catch (error) {
    console.error('Error:', error)
  }
})()
