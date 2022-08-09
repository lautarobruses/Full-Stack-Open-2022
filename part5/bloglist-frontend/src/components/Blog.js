import { useState } from "react"

const Blog = ({ blog }) => {
  const [ likes, setLikes ] = useState(blog.likes)
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

  //The likes state is not persist in the db :/
  //It's only decorative
  const handleLikeChange = (event) => {
    event.preventDefault()
    
    setLikes(likes + 1)
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
              likes: {likes} 
              <button onClick={handleLikeChange}>like</button>
          </div>
          <p>{blog.user.username}  </p>
        </div>
      }
      
    </div>
  )
}

export default Blog