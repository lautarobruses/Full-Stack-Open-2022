import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'

import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoged, loginUser, logoutUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import {
    Routes,
    Route,
    useMatch,
    useNavigate,
    Navigate
} from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logedUser = useSelector((state) => state.logedUser)
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blogs)

    useEffect(() => { //BLOGS
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => { //USERS
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => { //USER LOGED
        dispatch(initializeLoged())
        navigate('/blogs')
    }, [dispatch])

    console.log(logedUser)

    const login = (username, password) => {
        dispatch(loginUser(username, password))
            .catch(() => {
                dispatch(createNotification('wrong username/password', 'alert'))
            })
        dispatch(createNotification(`${username} logged in!`, 'info'))
    }

    const logout = () => {
        dispatch(logoutUser())
        dispatch(createNotification('good bye!', 'info'))
    }

    const matchUser = useMatch('/users/:id')
    const extendedUser = matchUser
        ? users.find(user => user.id === matchUser.params.id)
        : null

    const matchBlogs = useMatch('/blogs/:id')
    const extendedBlog = matchBlogs
        ? blogs.find(blog => blog.id === matchBlogs.params.id)
        : null


    return (
        <div className="container">
            <NavigationBar logedUser={logedUser} onLogout={() => logout()} />

            <Notification />

            <Routes>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<Blog blog={extendedBlog} user={logedUser} blogs={blogs} />} />
                <Route path="/users" element={<Users users={users}/> }/>
                <Route path="/users" element={logedUser ? <Users /> : <Navigate replace to="/login" />} />
                <Route path="/users/:id" element={<User user={extendedUser} />} />
                <Route path="/login" element={<LoginForm onLogin={login} />} />
            </Routes>

            <footer style={{ margin: 10 }}>
                <em>Blog app, by Lautaro Bruses</em>
            </footer>
        </div>
    )
}

export default App