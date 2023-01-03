import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added '${content}'`, 5))
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