import yaml from 'js-yaml'
import stubs from '../fixtures/stubs.json'
import { getPPPDiscountPercent } from '../../helpers/parityCoupon'
import { isGreaterThanToday } from '../../helpers/isGreaterThanToday'
import ppp from '../../constants/ppp.json'

it('location endpoint has all attributes', () => {
  cy.request('GET', '/api/location')
    .then(({ body }) => {
      expect(body).to.have.keys(['amount', 'country', 'eligible', 'priceId'])
    })
})

it('applying discount', () => {
  const stub = {
    amount: 0.45,
    country: 'SK',
    eligible: true,
    priceId: 'price_1MkwcQBnBECxBVfmsptKEgFK'
  }

  cy.readFile('./content/workshops.yml')
    .then(yaml.load)
    .its('body')
    .as('workshops')

  cy.get('@workshops')
    // @ts-ignore
    .each(({ startDate, slug, priceId }) => {
      if (isGreaterThanToday(startDate)) {
        cy.step('open workshop')
        cy.intercept(priceId).as('fetchOriginalPrice')
        cy.intercept(stub.priceId).as('fetchDiscountedPrice')
        cy.intercept('GET', '/api/location', stub).as('location')
        cy.visit('/workshop/' + slug)
        cy.wait(['@fetchOriginalPrice', '@location'])

        cy.step('display original price')
        cy.contains('499 €')
          .should('be.visible')

        cy.step('activate discount')
        cy.contains('Activate 45% discount')
          .click()

        cy.wait('@fetchDiscountedPrice')

        cy.contains('274 €')
          .should('be.visible')

        cy.step('remove discount')
        cy.contains('Click here if you want to remove discount')
          .click()

        cy.contains('274 €')
          .should('not.exist')

        cy.contains('499 €')
          .should('be.visible')

        cy.contains('Activate 45% discount')
          .should('be.visible')
      }
    })
})

it('fetching different discounts', () => {
  cy.readFile('./content/workshops.yml')
    .then(yaml.load)
    .its('body')
    .as('workshops')

  cy.get('@workshops')
    // @ts-ignore
    .each(({ startDate, slug }) => {
      if (isGreaterThanToday(startDate)) {
        cy.wrap(stubs)
          .each((stub) => {
            const stubAmount = (499 - (stub.amount * 100 * 5)).toFixed(0)
            cy.section(`open workshop with ${stubAmount} € price`)
            cy.intercept('GET', '/api/location', stub).as('location')
            cy.intercept(stub.priceId).as('fetchDiscountedPrice')
            cy.visit('/workshop/' + slug)
            cy.wait('@location')

            cy.step('activate discount')
            cy.contains(`Activate ${(stub.amount * 100).toFixed(0)}% discount`)
              .click()

            cy.step('price is correct')
            cy.contains(stubAmount)
              .should('be.visible')
          })
      }
    })
})

it('prices come in correct range', () => {
  const countries = Object.keys(ppp)
  const discounts: number[] = []

  countries.forEach((country) => {
    const discount = getPPPDiscountPercent(country)
    discounts.push(discount)
  })

  // find all discounts and sort them
  const sortedDiscounts = [...new Set(discounts)].sort()

  expect(sortedDiscounts).to.deep.eq([0, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55])
})
