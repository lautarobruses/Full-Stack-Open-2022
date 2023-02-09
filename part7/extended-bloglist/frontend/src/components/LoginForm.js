import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const padding = {
        padding: 10,
        margin: 20
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
        navigate('/blogs')
    }

    return (
        <div className="container">
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        name='username'
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder='username'
                        style={padding}
                    />
                    <Form.Control
                        type='password'
                        name='password'
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder='password'
                        style={padding}
                    />
                </Form.Group>
                <Button variant='outline-primary' type='submit'>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm