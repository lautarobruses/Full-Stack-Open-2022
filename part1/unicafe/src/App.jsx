import { useState } from 'react'

const App = () => {
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
      <h1>Give feedback</h1>
      <Button onClick={GoodClick} text="good" />
      <Button onClick={NeutralClick} text="neutral" />
      <Button onClick={BadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
	let average = (good - bad) / all
	let positive = good / all * 100
  
	if (all === 0) {
		return <p>No feedback given...</p>
	}
    
  return (
		<>
			<h1>Statistics</h1>

			<table>
				<tbody>
					<StatisticLine  text="good" value={good} />
					<StatisticLine  text="neutral" value={neutral} />
					<StatisticLine  text="bad" value={bad} />
					<StatisticLine  text="all" value={all} />
					<StatisticLine  text="average" value={average.toFixed(2)} />
					<StatisticLine  text="positive" value={positive.toFixed(2)} />
				</tbody>
			</table>
		</>
  )
}

const Button = ({ onClick, text }) => {
	return (
		<button onClick={onClick}>{text}</button>
	)
}

const StatisticLine  = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

export default App