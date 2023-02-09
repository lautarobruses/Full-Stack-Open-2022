import { createSlice } from '@reduxjs/toolkit'

import commentService from '../services/comments'

const commentSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComment(state, action) {
            state.push(action.payload)
        },
    },
})

export const initializeComments = (blogId) => {
    return async dispatch => {
        const commentsFromBlog = await commentService.getAll(blogId)
        if (commentsFromBlog) {
            dispatch(setComments(commentsFromBlog))
        }
    }
}

export const createComment = (blogId, newComment) => {
    return async dispatch => {
        const commentAdded = await commentService.create(blogId, newComment)
        dispatch(appendComment(commentAdded))
    }
}

export const { setComments, appendComment } = commentSlice.actions
export default commentSlice.reducer