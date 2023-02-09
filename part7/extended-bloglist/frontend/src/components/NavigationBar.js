import { Link } from 'react-router-dom'

import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const NavigationBar = ({ logedUser, onLogout }) => {

    const padding = {
        padding: 5
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as="span">
                            <Link style={padding} to="/blogs">blogs</Link>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <Link style={padding} to="/users">Users</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            {logedUser
                                ? <>
                                    <em>{logedUser.name} logged in </em>
                                    <Button variant='outline-secondary' onClick={onLogout}>
                                        Logout
                                    </Button>
                                </>
                                : <Link style={padding} to="/login">login</Link>
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    // <nav style={{ backgroundColor: 'lightgrey' }}>
    //     <Link style={padding} to="/blogs">blogs</Link>
    //     <Link style={padding} to="/users">users</Link>
    //     {logedUser
    //         ? <em>{logedUser.name} logged in</em>
    //         : <Link style={padding} to="/login">login</Link>
    //     }
    //     <Button variant='outline-secondary' onClick={onLogout}>
    //         logout
    //     </Button>
    // </nav>
    )
}

export default NavigationBar