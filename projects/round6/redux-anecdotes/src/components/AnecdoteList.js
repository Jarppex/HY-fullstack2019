import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {

    const state = store.getState()

    const byFilter = (anecdote) =>
        anecdote.content.toUpperCase().includes(state.filter.toUpperCase())

    const anecdotesToShow = state.anecdotes.filter(byFilter)

    anecdotesToShow.sort((first, second) => second.votes - first.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        store.dispatch(
            voteAnecdote(anecdote.id)
        )
        store.dispatch(
            voteAnecdoteNotification(anecdote.content)
        )
        setTimeout(() => {
            store.dispatch(
                resetNotification()
            )
        }, 5000)
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList