import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUsers(state, action) {
            const byBlogsCreated = (b1, b2) => b2.blogs.length>b1.blogs.length ? 1 : -1
            const users = action.payload.sort(byBlogsCreated)
            return users
        },
    },
})

export const initializeUsers = () => {
    return async dispatch => {
        const usersFromStorage = await userService.getAll()
        if (usersFromStorage) {
            dispatch(setUsers(usersFromStorage))
        }
    }
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer