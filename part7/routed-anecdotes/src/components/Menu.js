import About from "./About"
import AnecdoteList from "./AnecdoteList"
import CreateNew from "./CreateNew"
import Anecdote from "./Anecdote"
import { Link, Route, Routes, useMatch } from "react-router-dom"


const Menu = ({ anecdotes, addNew, notification }) => {
    const match = useMatch('/anecdotes/:id')
    const anecdote = match 
        ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
        : null

    const padding = {
        paddingRight: 5
    }    

    return (
        <>
            <nav>
                <Link style={padding} to="/">anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
            </nav>
            <div>{ notification }</div>
            <Routes>
                <Route path="/" element={ <AnecdoteList anecdotes={anecdotes} /> } />
                <Route path="/anecdotes/:id" element={ <Anecdote anecdote={anecdote} /> } />
                <Route path="/create" element={ <CreateNew addNew={addNew} /> }/>
                <Route path="/about" element={ <About /> }/>
            </Routes>
        </>
    )
}

export default Menu