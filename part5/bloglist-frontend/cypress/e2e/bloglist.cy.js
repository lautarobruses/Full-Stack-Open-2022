describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user1 = {
            name: 'Lautaro',
            username: 'MouGliXx',
            password: '123'
        }
        const user2 = {
            name: 'Not Lautaro',
            username: 'Another username',
            password: '321'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user1)
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
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
            cy.login({ username: 'MouGliXx', password: '123' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('test title blog')
            cy.get('#author').type('test author')
            cy.get('#url').type('https://url.test.com')
            cy.get('#create-button').click()
            cy.contains('test title blog')
        })

        describe('When a blog is created', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'test title blog', author: 'test author', url: 'https://url.test.com', likes: 0 })
            })

            it('A blog can be liked', function () {
                cy.get('#view-hide-button').click()
                cy.contains('likes:')
                cy.get('#like-button').click()
            })

            it('A blog cannot be removed by others users', function () {
                cy.get('#logout-button').click()

                cy.contains('login').click()
                cy.login({ username: 'Another username', password: '321' })
                cy.get('#view-hide-button').click()

                cy.contains('MouGliXx')
                cy.get('#remove-button').and('have.css', 'display', 'none')
            })

            it('A blog can be removed only by its user', function () {
                cy.get('#view-hide-button').click()
                cy.get('#remove-button').click()
            })
        })

        describe('and several blogs exist', function() {
            beforeEach(function () {
                cy.createBlog({ title: 'fist blog', author: 'first author', url: 'first url', likes: 9 })
                cy.createBlog({ title: 'second blog', author: 'second author', url: 'second url', likes: 5 })
                cy.createBlog({ title: 'third blog', author: 'third author', url: 'third url', likes: 3 })
                cy.createBlog({ title: 'fourth blog', author: 'fourth author', url: 'fourth url', likes: 0 })
            })

            it('', function () {

            })
        })
    })
})