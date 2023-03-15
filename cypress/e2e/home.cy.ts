describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the page title', () => {
    cy.get('title').should('contain', 'CodeTest - SleekFlow');
  });

  it('displays the page heading', () => {
    cy.get('h2').should('contain', 'Code Test - Rick and Morty API');
  });

  it('displays the view contact list button', () => {
    cy.get('a[href="/contact"]').should('contain', 'View Contact List');
  });

  it('redirects to contact list page when view contact button is clicked', () => {
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.contains('span', 'Alien Rick');
  });
});

export {}