/// <reference types="cypress" />

describe('Editing recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.intercept('POST', '**/recipes', (req) => {
      req.reply({
        statusCode: 201,
        body: { ...req.body, id: '318eh23rhrhf92h9' },
      });
    }).as('createEntry');
    cy.intercept('GET', '**/recipes', {
      statusCode: 201,
      body: [
        {
          name: 'pusty przepis',
          preparationTimeInMins: 90,
          ingredients: [
            {
              name: 'ghhgh',
              quantity: '5',
            },
            {
              name: 'hfhfh',
              quantity: '5',
            },
          ],
          description:
            'Copilot reviewed 8 out of 8 changed files in this pull request and generated 2 comments.',
          _id: '318eh23rhrhf92h9',
        },
      ],
    }).as('getEntries');
  });

  it('should open the editing recipe form on desktop view on the recipe card', () => {
    cy.viewport(1780, 1030);
    cy.intercept('GET', '**/recipes/**', {
      statusCode: 200,
      body: {
        name: 'pusty przepis',
        preparationTimeInMins: 90,
        ingredients: [
          { name: 'ghhgh', quantity: '5' },
          { name: 'hfhfh', quantity: '5' },
        ],
        description:
          'Copilot reviewed 8 out of 8 changed files in this pull request and generated 2 comments.',
        _id: '318eh23rhrhf92h9',
      },
    }).as('getRecipe');
    cy.visit('/');
    cy.wait('@getEntries');
    cy.wait('@getRecipe');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view on the recipe card', () => {
    cy.viewport(1029, 1030);
    cy.intercept('GET', '**/recipes/**', {
      statusCode: 200,
      body: {
        name: 'pusty przepis',
        preparationTimeInMins: 90,
        ingredients: [
          { name: 'ghhgh', quantity: '5' },
          { name: 'hfhfh', quantity: '5' },
        ],
        description:
          'Copilot reviewed 8 out of 8 changed files in this pull request and generated 2 comments.',
        _id: '318eh23rhrhf92h9',
      },
    }).as('getRecipe');
    cy.visit('/');
    cy.wait('@getEntries');
    cy.wait('@getRecipe');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on desktop view from the sidebar', () => {
    cy.viewport(1780, 1030);
    cy.intercept('GET', '**/recipes/**', {
      statusCode: 200,
      body: {
        name: 'pusty przepis',
        preparationTimeInMins: 90,
        ingredients: [
          { name: 'ghhgh', quantity: '5' },
          { name: 'hfhfh', quantity: '5' },
        ],
        description:
          'Copilot reviewed 8 out of 8 changed files in this pull request and generated 2 comments.',
        _id: '318eh23rhrhf92h9',
      },
    }).as('getRecipe');
    cy.visit('/');
    cy.wait('@getEntries');
    cy.wait('@getRecipe');
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view from the sidebar', () => {
    cy.viewport(1029, 1030);
    cy.intercept('GET', '**/recipes/**', {
      statusCode: 200,
      body: {
        name: 'pusty przepis',
        preparationTimeInMins: 90,
        ingredients: [
          { name: 'ghhgh', quantity: '5' },
          { name: 'hfhfh', quantity: '5' },
        ],
        description:
          'Copilot reviewed 8 out of 8 changed files in this pull request and generated 2 comments.',
        _id: '318eh23rhrhf92h9',
      },
    }).as('getRecipe');
    cy.visit('/');
    cy.wait('@getEntries');
    cy.wait('@getRecipe');
    cy.contains('menu').click();
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });
});
