import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            if (state !== null) {
                clearTimeout(state.duration)
            }
            const notification = {
                message: action.payload.content,
                type: action.payload.type,
                duration: action.payload.timer
            }
            return notification
        },
        clearNotification() {
            return null
        },
    },
})

export const createNotification = ( content, type ) => {
    return async dispatch => {
        let timer = setTimeout(() => {
            dispatch(clearNotification())
        }, 5 * 1000)
        dispatch(showNotification({ content, type, timer }))
    }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
