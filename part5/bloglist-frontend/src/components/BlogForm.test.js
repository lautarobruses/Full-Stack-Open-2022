// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    test('updates parent state and calls onSubmit', async () => {
        const inputs = screen.getAllByRole('textbox')
        const sendButton = screen.getByText('create')

        await user.type(inputs[0], 'testing a title')
        await user.type(inputs[1], 'testing an author')
        await user.type(inputs[2], 'testing an url')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing a title')
        expect(createBlog.mock.calls[0][0].author).toBe('testing an author')
        expect(createBlog.mock.calls[0][0].url).toBe('testing an url')
    })
})