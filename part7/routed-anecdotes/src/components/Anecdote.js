const Anecdote = ({ anecdote }) => {
    return (
        <>
            <h2>{anecdote.content}</h2>
            <h3>written by: '{anecdote.author}'</h3>
            <p>has <strong>{anecdote.votes}</strong> votes</p>
        </>
    )
}

export default Anecdote