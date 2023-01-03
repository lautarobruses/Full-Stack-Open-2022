import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updatedAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}


const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === "")
            return anecdotes
        else
            return anecdotes.filter(anecdote => {
                const anecdoteLowerCase = anecdote.content.toLowerCase()
                return anecdoteLowerCase.includes(filter.toLowerCase())
            })
    })
    // ↓ Use to sort the anecdotes in order of the votes
    const getItems = anecdotes => anecdotes
    const items = [...getItems(anecdotes)]
    items.sort((a, b) => b.votes - a.votes)
    //
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(updatedAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <>
            {items.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </>
    )
}

export default AnecdoteList