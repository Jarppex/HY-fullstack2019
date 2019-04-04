import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>
      {text}</button>
  }

const Statistic = (props) => {
    return <p>{props.text} {props.value} {props.unit}</p>
}

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad
  let average = (good - bad) / total
  let positivesFraction = good / total * 100

  if (total !== 0) {
    return (
    <div>
    <Header name='anna palautetta' />
    <Button
        handleClick={() => setGood(good + 1)}
        text='hyvä' />
    <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='neutraali' />
    <Button
        handleClick={() => setBad(bad + 1)}
        text='huono' />
    <Header name='statistiikka' />
    <Statistic text="hyvä" value ={good} />
    <Statistic text="neutraali" value ={neutral} />
    <Statistic text="huono" value ={bad} />
    <Statistic text="yhteensä" value ={total} />
    <Statistic text="keskiarvo" value ={average} />
    <Statistic text="positiivisia" value ={positivesFraction}
                unit='%' />
    </div>
    )
  }
  else {
    return (
    <div>
    <Header name='anna palautetta' />
    <Button
        handleClick={() => setGood(good + 1)}
        text='hyvä' />
    <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='neutraali' />
    <Button
        handleClick={() => setBad(bad + 1)}
        text='huono' />
    <Header name='statistiikka' />
    <p>Ei yhtään palautetta annettu</p>
    </div>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)