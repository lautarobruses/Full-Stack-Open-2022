import React, { useEffect, useState } from 'react'
//import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'; //Render in React 18

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])
  const [max, setMax] = useState({
    votes: 0, index:0
  })

  useEffect(() => {
    const length = anecdotes.length
    let temporalArray = new Array(length)
    temporalArray.fill(0)
    setPoints(temporalArray)
  }, [])

  const nextClick = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * anecdotes.length)
    } while (newIndex === selected)

    setSelected(newIndex)
  }

  const voteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    defineMax(copy[selected],selected)
  }

  function defineMax(act,i) {
    if (act > max.votes) {
      const newMax = {
        votes: act,
        index: i}
      setMax(newMax)
    }
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <h4>{anecdotes[selected]}</h4>
      <h4>has {points[selected]} votes.</h4>
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={nextClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <h4>{anecdotes[max.index]}</h4>
      <h4>has {points[max.index]} votes.</h4>
    </div>
  )
}

const Button = ({handleClick,text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

/*ReactDOM.render(
<App anecdotes={anecdotes} />,
  document.getElementById('root')
)*/

//Render in React 18
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App anecdotes={anecdotes} />);