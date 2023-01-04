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
    cy.get('[data-cy=blog-item]')
      .eq(0)
      .click()

    cy.get('[data-cy=blog-heading]')
      .should('be.visible')

    cy.get('[data-cy=code-block]')
  })

  it('workshops', () => {
    cy.visit('/workshops')
    cy.get('[data-cy=workshop-item]')
      .should('be.visible')
  })
})
