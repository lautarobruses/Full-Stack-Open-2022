const Anecdote = ({ anecdote }) => {
    return (
        <>
            <h2>{anecdote.content}</h2>
            <p>has <strong>{anecdote.votes}</strong> votes</p>
        </>
    )
}

export default Anecdote