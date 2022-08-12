import { useState } from 'react'

const Blog = ({ blog, canRemove, increaseLikes, deleteBlog }) => {
    const [ detailsVisible, setDetailsVisible ] = useState(false)
    const [ buttonLabel, setButtonLabel ] = useState('view')
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'dashed',
        borderWidth: 2,
        marginBottom: 5
    }

    const toggleVisibility = (event) => {
        event.preventDefault()

        setDetailsVisible(!detailsVisible)
        buttonLabel === 'view'
            ? setButtonLabel('hide')
            : setButtonLabel('view')
    }

    console.log(canRemove)

    const showWhenVisible = { display: detailsVisible ? '' : 'none' }
    const shownWhenUserCorrect = { display: canRemove ? '' : 'none' }

    return (
        <div style={blogStyle} className='blog'>
            <div>
                {blog.title} by {blog.author}
                <button id='view-hide-button' onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible} id='togglableContent'>
                <div>url: {blog.url}</div>
                <div>
                    likes: {blog.likes}
                    <button id='like-button' onClick={increaseLikes}>like</button>
                </div>
                <p>user: {blog.user.username}</p>
                <button id='remove-button' style={shownWhenUserCorrect} onClick={deleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog