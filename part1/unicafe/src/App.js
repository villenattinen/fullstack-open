import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  let average = (props.good + props.bad * -1) / all

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={props.good} />
        <StatisticLine text={'neutral'} value={props.neutral} />
        <StatisticLine text={'bad'} value={props.bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={props.good / all * 100 + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={'give feedback'}/>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
