describe('ContactPage', () => {
  beforeEach(() => {
    cy.visit('/contact/14');
  });

  it('should have the correct title and correct status', () => {
    cy.title().should('eq', 'Alien Morty - SleekFlow');
    cy.get('.is_unknown').should('have.css', 'color', 'rgb(214, 85, 0)');
  });
  
  it('should contain 1 rows in the episode', () => {
    cy.get('tbody')
      .find('tr')
      .should('have.length', 1);
  });
  
  it('check alive contact type and got 4 rows episodes', () => {
    cy.visit('/contact/35');

    cy.get('.is_Alive').should('have.css', 'color', 'rgb(0, 128, 0)');

      cy.get('tbody')
      .find('tr')
      .should('have.length', 4);
  });
});

export {}