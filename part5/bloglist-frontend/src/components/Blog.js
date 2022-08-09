import { useState } from 'react'

const Blog = ({ blog, username, increaseLikes, deleteBlog }) => {
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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} by {blog.author}
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            {detailsVisible &&
              <div>
                  <p>{blog.url}</p>
                  <div>
                    likes: {blog.likes}
                      <button onClick={increaseLikes}>like</button>
                  </div>
                  <p>{blog.user.username}</p>
                  {username === blog.user.username && <button onClick={deleteBlog}>remove</button>}
              </div>
            }
        </div>
    )
}

export default Blog