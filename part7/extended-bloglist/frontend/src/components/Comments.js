import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createComment } from '../reducers/commentReducer'

const Comments = ({ blogId }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    const [content, setContent] = useState('')

    if (comments.legth === 0) {
        return <h3>No comments yet</h3>
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createComment(blogId, content))
        setContent('')
    }

    return (
        <>
            <h3>Comments</h3>
            <form onSubmit={handleSubmit}>
                <input
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    id="newComment"
                    placeholder="write a comment"
                />
                <button type="submit">
                    add comment
                </button>
            </form>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Comments