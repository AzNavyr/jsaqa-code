describe('BooksApp e2e testing', () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get('.text-light > .ml-2');
  })

  it('Should successfully login', () => {
    let name = 'test@test.com';
    let pass = 'test';
    cy.login(name, pass);
    cy.get('.pt-2').contains(name);
  })

  it('Wrong password', () => {
    let name = 'test@test.com';
    let pass = 'pass';
    cy.login(name, pass);
  })
})