// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const mockHandler = jest.fn()
    let container

    const blog = {
        title: 'title test',
        author: 'author test',
        url: 'https://testurl.com.ar',
        likes: 31,
        user: 'idk'
    }

    beforeEach(() => {
        container = render(<Blog blog={blog} increaseLikes={mockHandler} />).container
    })

    test('renders title & author', () => {
        const element = screen.getByText('title test by author test')

        expect(element).toBeDefined()
    })

    test('at start url and number of likes are not displayed', () => {
        const div = container.querySelector('#togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, url and number of likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('#togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking 2 times the like button calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})



