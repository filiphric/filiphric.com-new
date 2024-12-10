export const resolveIcon = (filename: any) => {
  const parts = filename && filename.toLowerCase().split('.')
  const classes = []
  while (parts.length > 1) {
    parts.shift()
    // Ex. 'foo.min.js' would become '<span class="token keyword ext-min-js ext-js">foo.min.js</span>'
    classes.push('ext-' + parts.join('-'))
  }

  if (filename.charAt(0) === '.') {
    classes.push('dotfile')
  }
  if (filename.includes('package')) {
    classes.push('package')
  }
  if (filename.includes('postcss.config')) {
    classes.push('postcssconfig')
  }
  if (filename.includes('vite.config')) {
    classes.push('viteconfig')
  }
  if (filename.includes('.cy.')) {
    classes.push('cypress_spec')
  }
  if (filename.includes('.spec.ts')) {
    classes.push('spec_ts')
  }
  if (filename.includes('.spec.js')) {
    classes.push('spec_js')
  }
  if (filename.includes('cypress.config.') || filename.includes('cypress.json')) {
    classes.push('cypressconfig')
  }
  if (filename.includes('playwright.config.')) {
    classes.push('playwrightconfig')
  }
  if (filename.includes('nx.json')) {
    classes.push('nx')
  }
  if (filename.includes('tsconfig.json') || filename.includes('tsconfig.node.json') || filename.includes('tsconfig.base.json')) {
    classes.push('tsconfig')
  }
  // don’t forget to add icon references to main.css file

  return classes
}
