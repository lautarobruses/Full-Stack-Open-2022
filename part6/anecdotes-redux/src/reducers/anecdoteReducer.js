import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const anecdoteChanged = action.payload

            return state.map(anecdote => 
                anecdote.id === anecdoteChanged.id ? anecdoteChanged : anecdote
            )
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteServices.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteServices.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const updatedAnecdote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteServices.update(anecdote.id, anecdote)
        dispatch(voteAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer