import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    },
})

export const initializeLoged = () => {
    return async dispatch => {
        const usersFromStorage = await userService.getUser()
        if (usersFromStorage) {
            dispatch(setUser(usersFromStorage))
        }
    }
}

export const loginUser = (username, password ) => {
    return async dispatch => {
        const logedUser = await loginService.login({ username, password })
        dispatch(setUser(logedUser))
        userService.setUser(logedUser)
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch(setUser(null))
        userService.clearUser()
    }
}

export const { setUser } = loginSlice.actions
export default loginSlice.reducer