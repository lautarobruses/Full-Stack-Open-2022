import React from "react"
import { connect } from 'react-redux'
import { updatedAnecdote } from "../reducers/anecdoteReducer"

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

const AnecdoteList = (props) => {
    // ↓ Use to sort the anecdotes in order of the votes
    const getItems = anecdotes => props.anecdotes
    const items = [...getItems(props.anecdotes)]
    items.sort((a, b) => b.votes - a.votes)
    //

    return (
        <>
            {items.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => props.updatedAnecdote(anecdote)}
                />
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === "")
            return {
                anecdotes: state.anecdotes
            }
        else
            return {
                anecdotes: state.anecdotes.filter(anecdote => {
                    const anecdoteLowerCase = anecdote.content.toLowerCase()
                    return anecdoteLowerCase.includes(state.filter.toLowerCase())
                })
            }
}

const mapDispatchToProps = {
    updatedAnecdote,
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes