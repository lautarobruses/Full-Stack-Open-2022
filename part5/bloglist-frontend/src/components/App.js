import { useState, useEffect } from 'react'
import Blog from './Blog'
import Error from './Error'
import Notification from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
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

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }

    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      
      setNotification(`added a new blog: ${returnedBlog.title} by ${returnedBlog.author}` )
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (exception) {
      console.log(exception.response.data.error)
      setError(exception.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const loginForm = () => {
    return (
      <>
        <h1>log in to application</h1>
        <Error message={error} />
        <form onSubmit={handleLogin}>
          <div>
            username: 
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password: 
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification message={notification} />
        <Error message={error} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <br></br>

        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title: 
              <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author: 
              <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url: 
              <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>

        <br></br>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  return (
    <div>
      {
        user === null ?
          loginForm() :
          blogForm()
      }
    </div>
  )
}

export default App
