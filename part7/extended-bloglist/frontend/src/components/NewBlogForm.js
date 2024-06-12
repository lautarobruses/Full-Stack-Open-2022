import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        onCreate({ title, author, url, likes: 0 })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={handleCreate}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        type='text'
                        name='title'
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="title of the blog"
                    />
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        type='text'
                        name='author'
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="author of the blog"
                    />
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        type='text'
                        name='url'
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="url of the blog"
                    />
                    <Button variant='outline-primary' type='submit'>
                        Create
                    </Button>
                </Form.Group>
            </form>
        </>
    )
}

export default NewBlogForm
