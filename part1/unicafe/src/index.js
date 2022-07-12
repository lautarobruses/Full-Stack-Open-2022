import React, { useState } from 'react'
//import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'; //Render in React 18

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const GoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  
  const NeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  
  const BadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={GoodClick} text="good" />
      <Button handleClick={NeutralClick} text="neutral" />
      <Button handleClick={BadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}

const Statistics = ({good,neutral,bad,all}) => {
  let average = (good - bad) / all
  let positive = good / all * 100

  if (all === 0) {
    return <p>waiting for any click...</p>
  }
  
  return (
    <>
      <h1>statistics</h1>

      <table>
        <tbody>
        <tr><Statistic text="good" value={good} /></tr>
        <tr><Statistic text="neutral" value={neutral} /></tr>
        <tr><Statistic text="bad" value={bad} /></tr>
        <tr><Statistic text="all" value={all} /></tr>
        <tr><Statistic text="average" value={average.toFixed(2)} /></tr>
        <tr><Statistic text="positive" value={positive.toFixed(2)} /></tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({handleClick,text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text,value}) => {
  return (
    <>
      <th>{text}</th>
      <th>{value}</th>
    </>
  )
}

//ReactDOM.render(<App />, document.getElementById('root'))

//Render in React 18
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);