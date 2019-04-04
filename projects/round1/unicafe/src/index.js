import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>
      {text}</button>
  }

const Content = (props) => {
    return (
        <div>
          <Part label={props.labels.good}
                score={props.goodScore} />
          <Part label={props.labels.neutral}
                score={props.neutralScore} />
          <Part label={props.labels.bad}
                score={props.badScore} />

          <Part label={props.labels.total}
                score={props.totalScore} />
          <Part label={props.labels.average}
                score={props.averageScore} />
          <Part label={props.labels.positivesFraction}
                score={props.positivesFractionScore}
                unit={'%'} />
        </div>
      )
}

const Part = (props) => {
    return <p>{props.label} {props.score} {props.unit}</p>
}

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = (good - bad) / total
  let positivesFraction = good / total * 100

  const headerLabels =
  {
    firstHeader: 'anna palautetta',
    secondHeader: 'statistiikka'
  }
  const scoreLabels =
  {
    good: 'hyvä',
    neutral: 'neutraali',
    bad: 'huono',
    total: 'yhteensä',
    average: 'keskiarvo',
    positivesFraction: 'positiivisia'
  }

  return (
    <div>
      <Header name={headerLabels.firstHeader} />
      <Button
        handleClick={() => setGood(good + 1)}
        text={scoreLabels.good} />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text={scoreLabels.neutral} />
      <Button
        handleClick={() => setBad(bad + 1)}
        text={scoreLabels.bad} />
      <Header name={headerLabels.secondHeader} />
      <Content
        labels={scoreLabels}
        goodScore={good}
        neutralScore={neutral}
        badScore={bad}
        totalScore={total}
        averageScore={average}
        positivesFractionScore={positivesFraction} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)