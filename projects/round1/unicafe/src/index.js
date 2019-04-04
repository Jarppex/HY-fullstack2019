import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Button = ({ handleClick, text }) => {
    console.log('renderButton')
    return (<button onClick={handleClick}>
      {text}
    </button>)
  }

const Content = (props) => {
    return (
        <div>
          <Part label={props.labels.good} score={props.goodScore} />
          <Part label={props.labels.neutral} score={props.neutralScore} />
          <Part label={props.labels.bad} score={props.badScore} />
        </div>
      )
}

const Part = (props) => {
    return <p>{props.label} {props.score}</p>
}

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const firstHeader = 'anna palautetta'
  const secondHeader = 'statistiikka'
  const scoreLabels =
  {
    good: 'hyvä',
    neutral: 'neutraali',
    bad: 'huono'
  }

  return (
    <div>
      <Header name={firstHeader} />
      <Button
        handleClick={() => setGood(good + 1)}
        text={scoreLabels.good} />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text={scoreLabels.neutral} />
      <Button
        handleClick={() => setBad(bad + 1)}
        text={scoreLabels.bad} />
      <Header name={secondHeader} />
      <Content
        labels={scoreLabels}
        goodScore={good}
        neutralScore={neutral}
        badScore={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)