import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const byFilter = (anecdote) =>
        anecdote.content.toUpperCase().includes(props.filter.toUpperCase())

    const anecdotesToShow = props.anecdotes.filter(byFilter)

    anecdotesToShow.sort((first, second) => second.votes - first.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        props.voteAnecdote(anecdote.id)
        props.voteAnecdoteNotification(anecdote.content)
        setTimeout(() => {
            props.resetNotification()
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    voteAnecdoteNotification,
    resetNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)