describe('Editing recipe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should open the editing recipe form on desktop view on the recipe card', () => {
    cy.viewport(1780, 1030);
    cy.url().should('include', '/recipes');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view on the recipe card', () => {
    cy.viewport(1029, 1030);
    cy.url().should('include', '/recipes');
    cy.contains('Edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on desktop view from the sidebar', () => {
    cy.viewport(1780, 1030);
    cy.url().should('include', '/recipes');
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });

  it('should open the editing recipe form on mobile view from the sidebar', () => {
    cy.viewport(1029, 1030);
    cy.url().should('include', '/recipes');
    cy.contains('menu').click();
    cy.contains('edit').click();
    cy.url().should('include', '/edit');
  });
});
