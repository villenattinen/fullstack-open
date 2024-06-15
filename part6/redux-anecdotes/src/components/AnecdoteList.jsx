import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecodeList = () => {
	const anecdotes = useSelector(state => {
		if (state.filter === '') {
			return state.anecdotes
		}
		return state.anecdotes.filter(anecdote => 
			anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
		)
	})
	const dispatch = useDispatch()

	const vote = (id) => {
		console.log('vote', id)
		dispatch(voteAnecdote(id))
		dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
	}

	return (
		[...anecdotes].sort((firstAnecdote, secondAnecdote) => 
			secondAnecdote.votes - firstAnecdote.votes).map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
		)
	)
}

export default AnecodeList