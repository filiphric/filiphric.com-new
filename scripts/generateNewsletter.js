/**
 * This code is meant to be ran in browser console after blogpost is written
 * it will copy ConvertKit-friendly code into your clipboard which you can then pase
 * into ConverKit
 */

// styles of code block
const CODE_CSS_PROPERTIES = [
  'background-color',
  'font-size',
  'color'
]

const arr = document.querySelectorAll('pre, pre *, span, p code')
arr.forEach((el) => {
  // Grab computed styles
  const styles = getComputedStyle(el)

  // Generate inline style and apply
  el.style = CODE_CSS_PROPERTIES.reduce((prev, next) => {
    prev += `${next}: ${styles.getPropertyValue(next)};`
    return prev
  }, '')
  // remove classes that we will not use anymore
  el.removeAttribute('class')
})

// remove unnecessary attributes from paragraph elements
const p = document.querySelectorAll('p')
p.forEach((el) => {
  el.innerHTML = el.innerHTML.replaceAll('<!--[-->', '')
  el.innerHTML = el.innerHTML.replaceAll('<!--]-->', '')
  el.removeAttribute('class')
})

// remove code toolbar element
const codeToolbar = document.querySelectorAll('[data-cy="code-toolbar"]')
codeToolbar.forEach((el) => {
  el.remove()
})

// remove code block element and just keep children elements
const codeBlock = document.querySelectorAll('[data-cy="code-block"]')
codeBlock.forEach((el) => {
  el.replaceWith(...el.childNodes)
})

// add rounded style
const pre = document.querySelectorAll('pre')

pre.forEach((el) => {
  // eslint-disable-next-line no-unused-expressions
  el.removeAttribute.style
  el.style = 'background-color: rgb(40, 42, 58);font-size: 16px;color: rgb(255, 255, 255);font-family: monospace;padding:20px; border-radius: 10px;border: 2px solid rgb(40, 42, 58);'
})

const html = document.querySelector('[data-cy="blog-content"]').innerHTML

// copy the html
copy(html)
