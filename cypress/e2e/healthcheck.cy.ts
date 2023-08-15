describe('basic functionality', () => {
  it('homepage', () => {
    cy.visit('/')
    cy.get('[data-cy=hero-element]')
      .should('be.visible')

    cy.contains('nav a', 'Blog')
      .click()

    cy.get('[data-cy=blog-item]')
      .should('be.visible')

    cy.contains('nav a', 'Workshops')
      .click()

    cy.get('[data-cy=workshop-item]')
      .should('be.visible')
  })
  it('blogs', () => {
    cy.visit('/blog')
    cy.contains('[data-cy=blog-item]', 'How to structure a big project in Cypress')
      .click()

    cy.get('[data-cy=blog-heading]')
      .should('be.visible')
      .and('contain.text', 'How to structure a big project in Cypress')

    cy.get('[data-cy=code-block]')
  })

  it('workshops', () => {
    cy.visit('/workshops')
    cy.get('[data-cy=workshop-item]')
      .should('be.visible')
  })
})
