describe('ContactPage', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should have the correct title', () => {
    cy.title().should('eq', 'Contact List - SleekFlow');
  });

  it('should display the table with data and pagination', () => {
    cy.get('.ant-table').should('be.visible');
    cy.get('.ant-table-row').should('have.length.gt', 0);
    cy.get('.ant-pagination').should('be.visible');
    cy.get('.ant-pagination-item').should('have.length.gt', 0);
  });

  it('should update table data when searching for contacts', () => {
    cy.get('.ant-input').type('Rick');
    cy.get('.ant-input').should('have.value', 'Rick');
    cy.wait(500); // wait for delay 500 timeout
    cy.get('.ant-table-row').should('have.length.gt', 0);
  });

  it('should change table data when changing the page', () => {
    cy.get('.ant-pagination-item').contains('2').click();
    cy.get('.ant-pagination-item-active').contains('2');
    cy.get('.ant-table-row').should('have.length.gt', 0);
  });

  it('bonus pagination - change table data when chaging the page', () => {
    cy.get('.page_btn').contains('3').click();
    cy.get('.active-page').contains('3');
    cy.get('.ant-table-row').should('have.length.gt', 0);
  });

  it('should navigate to correct detail page when click some row (here 15 for example)', () => {
    cy.get('tr[data-row-key="15"]').click();
    cy.url().should('include', '/contact/15');
    cy.contains('span', 'Alien Rick');
  });

  
});

export {}


