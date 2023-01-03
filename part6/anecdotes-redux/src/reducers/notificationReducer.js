import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        showNotification(state, action) {
            const message = action.payload
            return message
        },
        clearNotification(state, action) {
            return null
        }
    },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer