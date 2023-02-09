import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        increseLikesOf(state, action) {
            const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
            const blogLiked = action.payload
            const blogs = state
                .map(anecdote =>
                    anecdote.id === blogLiked.id ? blogLiked : anecdote
                ).sort(byLikes)
            return blogs
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        deleteBlog(state, action) {
            const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
            const removedBlog = action.payload
            const blogs = state.filter((b) => b.id !== removedBlog.id).sort(byLikes)
            return blogs
        },
        setBlogs(state, action) {
            const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
            const blogs = action.payload.sort(byLikes)
            return blogs
        }
    },
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(newBlog)
        dispatch(appendBlog(createdBlog))
    }
}

export const removeBlog = (blog) => {
    return dispatch => {
        blogService
            .remove(blog.id)
            .then(() =>
                dispatch(deleteBlog(blog))
            )
    }
}

export const increaseLikes = (liked) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(liked.id, liked)
        dispatch(increseLikesOf(updatedBlog))
    }
}

export const { increseLikesOf, appendBlog, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer