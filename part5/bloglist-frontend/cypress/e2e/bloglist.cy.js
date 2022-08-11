describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        // const user = {
        //     name: 'Lautaro',
        //     username: 'MouGliXx',
        //     password: '123'
        // }
        // cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3001')
    })

    it('Login form is shown', function() {
        cy.contains('Blogs')

        cy.contains('login').click()

        cy.contains('log in to application')
        cy.contains('username:')
        cy.get('#username')
        cy.contains('password:')
        cy.get('#password')
        cy.get('#login-button')
    })
})