describe('Positive test suite', () => {
    let mail = 'qamid@qamid.ru';
    let pass = 'qamid';

    it('Log in using the correct username and password', () => {
        cy.visit('http://qamid.tmweb.ru/admin/index.php');
        cy.get('.login__wrapper').should('be.visible');
        cy.get('[for="email"] > .login__input').type(mail);
        cy.get('[for="pwd"] > .login__input').type(pass);
        cy.get('.login__button').click();
        cy.get('#hall-control > .conf-step__header > .conf-step__title').should('be.visible');
    })
})

describe('Negative test suite', () => {
    let mail = 'qamid@qamid.ru';
    let pass = 'qqwwee';

    it('Log in using the incorrect password', () => {
        cy.visit('http://qamid.tmweb.ru/admin/index.php');
        cy.get('.login__wrapper').should('be.visible');
        cy.get('[for="email"] > .login__input').type(mail);
        cy.get('[for="pwd"] > .login__input').type(pass);
        cy.get('.login__button').click();
        cy.get('body').contains('Ошибка авторизации!').should('be.visible');
    })
    it('Log in with empty authorization fields', () => {
        cy.visit('http://qamid.tmweb.ru/admin/index.php');
        cy.get('.login__wrapper').should('be.visible');
        cy.get('.login__button').click();
        cy.get('[for="email"] > .login__input').then($el => $el[0].checkValidity).should('not.be.true');
    })
})