import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(response => response.data)

export const createAnecdote = (newAnecdote) =>
  axios.post('http://localhost:3001/anecdotes', newAnecdote).then(response => response.data)

export const updateAnecdote = (updatedAnecdote) =>
  axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote).then(response => response.data)