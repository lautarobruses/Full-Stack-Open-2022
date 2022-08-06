const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('GET tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('the name of the unique identifier is "ID"' , async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST tests', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'blog test',
            author: 'test author',
            url: 'https://www.test.com/',
            likes: 9999,
        }

        const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhdXRhcm8iLCJpZCI6IjYyZWRhY2YxNWZkZjY2OGYwYzhiYTEyYyIsImlhdCI6MTY1OTc0NDE3OH0.6QS-0DRs4-o8Qm51H8rhSf1lng1XujDOaXBUFUaS3os'

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(3)
        expect(titles).toContain('blog test')
    })

    test('a blog without likes is posted with the default value', async () => {
        const newBlog = {
            title: 'blog test',
            author: 'test author',
            url: 'https://www.test.com/',
        }

        const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhdXRhcm8iLCJpZCI6IjYyZWRhY2YxNWZkZjY2OGYwYzhiYTEyYyIsImlhdCI6MTY1OTc0NDE3OH0.6QS-0DRs4-o8Qm51H8rhSf1lng1XujDOaXBUFUaS3os'

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const likes = response.body.map(blog => blog.likes)

        expect(likes.pop()).toBe(0)
    })

    test('blog without title is answered with 400 status code', async () => {
        const newBlog = {
            author: 'test author',
            likes: 999,
        }

        const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhdXRhcm8iLCJpZCI6IjYyZWRhY2YxNWZkZjY2OGYwYzhiYTEyYyIsImlhdCI6MTY1OTc0NDE3OH0.6QS-0DRs4-o8Qm51H8rhSf1lng1XujDOaXBUFUaS3os'

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(400)
    })

    test('blog with an invalid token is answered with the 401 status code', async () => {
        const newBlog = {
            title: 'blog test',
            author: 'test author',
            url: 'https://www.test.com/',
            likes: 9999,
        }

        const token = 'bearer a_bad_token'

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: token })
            .expect(401)
    })
})

describe('USERS tests', () => {
    test('creation fails with proper statuscode and message if password is too short', async () => {
        const newUser = {
            username: 'Groot',
            name: 'Testuser',
            password: '1',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password too short')

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const newUser = {
            username: 'Lautaro',
            name: 'Testuser',
            password: '00000',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    })

    test('a valid user login', async () => {
        const validUser = {
            username: 'Lautaro',
            password: '00000',
        }

        await api
            .post('/api/login')
            .send(validUser)
            .expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})