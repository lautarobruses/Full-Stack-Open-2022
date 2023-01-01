import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [
    {
        content: "If it hurts, do it more often",
        id: 1,
        votes: 0
    },
    {
        content: "Adding manpower to a late software project makes it later!",
        id: 2,
        votes: 0
    },
    {
        content: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        id: 3,
        votes: 0
    }
]

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push({
                content: content,
                id: getId(),
                votes: 0
            })
        },
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            const anecdoteChanged = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }

            return state.map(anecdote => 
                anecdote.id === id ? anecdoteChanged : anecdote
            )
        }
    }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer