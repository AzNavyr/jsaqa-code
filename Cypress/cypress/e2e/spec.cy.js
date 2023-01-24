
describe('BooksApp e2e testing', {
    viewportHeight: 1000,
    viewportWidth: 400,
}, () => {

    it('Should successfully login',() => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        let pass = 'test';

        cy.login(name, pass);

        cy.get('.pt-2').contains(name).should('be.visible');
    })

    it('Wrong password', () => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        let pass = 'passs';

        cy.login(name, pass);

        cy.get('.mb-3')
            .contains('Неправильая почта или пароль')
            .should('be.visible')
    })

    it('HTMl5 validation, password is empty', () => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        cy.contains('Log in').click();

        cy.get('#mail').type(name)

        cy.get('#pass').then($el => $el[0].checkValidity).should('not.be.true');
    })

    it('Add a new book', () => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        let pass = 'test';

        cy.login(name, pass);
        cy.get('.pt-2').contains(name).should('be.visible');

        cy.contains('Add new').click();
        cy.contains('Book description').should('be.visible');

        cy.get('#title').type('Маленький принц');
        cy.get('#description').type('История, которая заставляет по-другому посмотреть на привычные вещи.');
        cy.get('#authors').type('Антуан де Сент-Экзюпери');
        cy.get('.form-check-label').click();
        cy.contains('Submit').click();
        cy.get('.pt-2').contains(name).should('be.visible');
        cy.contains('Маленький принц').should('be.visible');
    })

    it('Delete favorite book', () => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        let pass = 'test';

        cy.login(name, pass);
        cy.get('.pt-2').contains(name).should('be.visible');
        cy.get('h4').click();
        cy.contains('Маленький принц').should('be.visible');
        cy.contains("Delete from ").click()
    })

    it('Add favorote', {defaultCommandTimeout: 7000}, () => {
        cy.visit('/');
        cy.get('.text-light > .ml-2');
        let name = 'test@test.com';
        let pass = 'test';

        cy.login(name, pass);
        cy.get('.pt-2').contains(name).should('be.visible');
        cy.contains('Маленький принц').should('be.visible');
        cy.contains("Add to favorite").click();
        cy.get('h4').click();
        cy.contains('Маленький принц').should('be.visible');
    })
})