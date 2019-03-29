import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => {
  console.log('renderDisplay')
  return (<div>{counter}</div>)
}

const Button = ({ handleClick, text }) => {
  console.log('renderButton')
  return (<button onClick={handleClick}>
    {text}
  </button>)
}

const App = (_props) => {
  const [ counter, setCounter ] = useState(0)

  const setToValue = (value) => setCounter(value)

/*
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
*/

  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={() => setToValue(counter + 1)}
        text='plus'
      />
      <Button
        handleClick={() => setToValue(counter - 1)}
        text='minus'
      />
      <Button
        handleClick={() => setToValue(0)}
        text='zero'
      />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)