import { environment } from '../../src/environments/environment';

describe('Editing recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.request(
      'POST',
      `https://crudcrud.com/api/${environment.apiKey}/recipes`,
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
      },
    );
  });

  it('should open the editing recipe form on desktop view on the recipe card', () => {
    cy.viewport(1780, 1030);
    cy.visit('/recipes');
    cy.url().should('include', '/recipes');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view on the recipe card', () => {
    cy.viewport(1029, 1030);
    cy.visit('/recipes');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on desktop view from the sidebar', () => {
    cy.viewport(1780, 1030);
    cy.visit('/recipes');
    cy.url().should('include', '/recipes');
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view from the sidebar', () => {
    cy.viewport(1029, 1030);
    cy.visit('/recipes');
    cy.contains('menu').click();
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });
});
