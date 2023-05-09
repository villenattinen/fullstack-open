import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const initArr = Array(8).fill(0)
  const [points, setPoints] = useState(initArr)
  const copyPoints = [...points]
  copyPoints[selected]+=1
  const mostPoints = points.indexOf(Math.max(...points))
  console.log(points)

  return (
    <div>
      <Header text={'Anecdote of the day'}/>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} votes
      <br></br>
      <Button handleClick={() => setPoints(copyPoints)} text='vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 8))} text='next anecdote' />
      <Header text={'Anecdote with most votes'}/>
      {anecdotes[mostPoints]}
      <br></br>
      has {points[mostPoints]} votes
    </div>
  )
}

export default App
