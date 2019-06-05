import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('create new anecdote!')
        props.createAnecdote(anecdote)
        props.createAnecdoteNotification(anecdote)
        setTimeout(() => {
            props.resetNotification()
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

const mapDispatchToProps = {
    createAnecdote,
    createAnecdoteNotification,
    resetNotification
}

export default connect(
    null,
    mapDispatchToProps
    )(AnecdoteForm)