import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
        /*
        props.voteAnecdoteNotification(anecdote)
        setTimeout(() => {
            props.resetNotification()
        }, 5000)*/
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = (state) => {
    const byFilter = (anecdote) =>
        anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
    const anecdotesToShow = state.anecdotes.filter(byFilter)
    return anecdotesToShow.sort((first, second) => second.votes - first.votes)
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)