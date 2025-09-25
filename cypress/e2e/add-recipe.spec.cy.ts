/// <reference types="cypress" />
describe('Adding recipe', () => {
  beforeEach(() => {
    cy.viewport(1780, 1030);
    cy.intercept('GET', '**/recipes', {
      statusCode: 201,
      body: [],
    }).as('getEntries');
    cy.visit('http://localhost:4200/');
  });

  it('should open the adding recipe form on desktop view', () => {
    cy.viewport(1780, 1030);
    cy.wait('@getEntries');
    cy.contains('Add').click();
    cy.url().should('include', '/add');
  });

  it('should open the adding recipe form on mobile view', () => {
    cy.viewport(1029, 1030);
    cy.contains('menu').click();
    cy.wait('@getEntries');
    cy.contains('Add').click();
    cy.url().should('include', '/add');
  });
});
