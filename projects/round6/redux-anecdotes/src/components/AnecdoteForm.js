import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        console.log('create new anecdote!')
        const anecdote = asObject(event.target.anecdote.value)
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.setNotification(`'${anecdote.content}' created`, 5)
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
    setNotification
}

export default connect(
    null,
    mapDispatchToProps
    )(AnecdoteForm)