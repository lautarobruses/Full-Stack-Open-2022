import React from "react"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdote, handleClick}) => {
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
    const anecdotes = useSelector(state => 
        state.sort((a, b) => {
            return b.votes - a.votes
    }))
    const dispatch = useDispatch()

    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => vote(anecdote.id)}
                />
            )}
        </>
    )
}

export default AnecdoteList