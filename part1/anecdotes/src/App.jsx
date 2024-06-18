import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code ahccounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const N = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(N).fill(0)) //create a zero-filled array of the desired length.
  const [max, setMax] = useState({
    votes: 0, index:0
  })

  const voteClick = () => {
    const copyPoints = {...points}
    
    copyPoints[selected] += 1
    setPoints(copyPoints)
    defineMax(copyPoints[selected], selected)
  }


  const nextClick = () => {
    let newIndex

    do {
      newIndex = Math.floor(Math.random() * N)
    } while (newIndex === selected)

    setSelected(newIndex)
  }

  const defineMax = (actual, i) => {
    if (actual > max.votes) {
      const newMax = {
        votes: actual,
        index: i
      }

      setMax(newMax)
    }
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes.</p>
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={nextClick} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max.index]}</p>
      <p>has {max.votes} votes.</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

export default App