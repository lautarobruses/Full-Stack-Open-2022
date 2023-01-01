import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch({ type: "anecdotes/createAnecdote", payload:content })
        dispatch({ type: "notification/showAddedAnecdote", payload:content })
        setTimeout(() => {
            dispatch({ type: "notification/deleteNotification", payload:null })
        }, 5000)
        
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm