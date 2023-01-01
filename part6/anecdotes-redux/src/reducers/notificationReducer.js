import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        showAddedAnecdote(state, action) {
            const message = action.payload
            return 'you added "' + message + '"'
        },
        showVotedAnecdote(state, action) {
            const message = action.payload
            return 'you voted "' + message + '"'
        },
        deleteNotification(state, action) {
            const message = action.payload
            return message
        }
    },
})

export const { showAddedAnecdote, showVotedAnecdote, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer