import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }

    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`added a new blog: ${returnedBlog.title} by ${returnedBlog.author}` )
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
      .catch(error => {
        setError(error.response.data.error)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <Error message={error} />

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            error={error}
          />
        </Togglable> :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>  
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
            />
          )}
        </div>
      }
    </div>
  )
}

export default App