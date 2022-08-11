describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Lautaro',
            username: 'MouGliXx',
            password: '123'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
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

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('MouGliXx')
            cy.get('#password').type('123')
            cy.get('#login-button').click()

            cy.contains('Lautaro logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('MouGliXx')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Lautaro logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#username').type('MouGliXx')
            cy.get('#password').type('123')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('test title blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('https://url.test.com')
            cy.get('#create-button').click()
            cy.contains('test title blog')
        })
    })
})