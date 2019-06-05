import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('create new anecdote!')
        store.dispatch(
            createAnecdote(anecdote)
        )
        store.dispatch(
            createAnecdoteNotification(anecdote)
        )
        setTimeout(() => {
            store.dispatch(
                resetNotification()
            )
        }, 5000)
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
            <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm