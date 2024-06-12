import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import Comments from './Comments'

import { createNotification } from '../reducers/notificationReducer'
import { increaseLikes, removeBlog } from '../reducers/blogReducer'
import { initializeComments } from '../reducers/commentReducer'

const Blog = ({ blog, user, blogs }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
    const own = blog.user && user.username===blog.user.username

    // const style = {
    //     padding: 3,
    //     margin: 5,
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    // }

    useEffect(() => {
        dispatch(initializeComments(blog.id))
    }, [dispatch])

    const remove = (toRemove) => {
        const ok = window.confirm(
            `remove '${toRemove.title}' by ${toRemove.author}?`
        )

        if (!ok) {
            return
        }

        dispatch(removeBlog(toRemove))
        dispatch(createNotification(`you have removed '${toRemove.title}' succesfull`, 'info'))
        navigate('/blogs')
    }

    const like = (blog) => {
        const toLike = blogs.find(b => b.id === blog.id)
        const liked = {
            ...toLike,
            likes: (toLike.likes||0) + 1,
            user: toLike.user.id
        }
        dispatch(increaseLikes(liked))
        dispatch(createNotification(`you liked '${blog.title}' by ${blog.author}`, 'info'))
    }

    return (
        <div id="blog">
            <h2>{blog.title} by {blog.author}</h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{' '}
                <button onClick={() => like(blog)}>like</button>
            </div>
            <div>
                {own && <button onClick={() => remove(blog)}>remove</button>}
            </div>
            <div>
                added by {addedBy}
            </div>
            <Comments blogId={blog.id} />
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }),
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Blog