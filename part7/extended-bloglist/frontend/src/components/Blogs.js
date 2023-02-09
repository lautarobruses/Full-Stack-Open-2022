import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Blogs = () => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const blogs = useSelector((state) => state.blogs)

    const create = (blog) => {
        dispatch(createBlog(blog))
            .catch(error => {
                dispatch(createNotification(`creating a blog failed: ${error.response.data.error}`, 'alert'))
            })
        dispatch(createNotification(`a new blog '${blog.title}' by ${blog.author} added`, 'info'))
        blogFormRef.current.toggleVisibility()
    }

    return (
        <div id="blogs">
            <h2>Blogs</h2>

            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <NewBlogForm onCreate={create} />
            </Togglable>

            <Table striped bordered hover>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                            <td>
                                {blog.author}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Blogs