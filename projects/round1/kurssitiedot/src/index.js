import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Content = (props) => {
    return (
        <div>
          <Part part={props.part1} exercises={props.exercises1} />
          <Part part={props.part2} exercises={props.exercises2} />
          <Part part={props.part3} exercises={props.exercises3} />
        </div>
      )
}

const Part = (props) => {
    return <p>{props.part} {props.exercises}</p>
}

const Total = (props) => {
    return <p>yhteensä {props.exercisesSum} tehtävää</p>
}

const App = () => {
  /*
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14
  */

 const course = 'Half Stack -sovelluskehitys'
 const part1 = {
   name: 'Reactin perusteet',
   exercises: 10
 }
 const part2 = {
   name: 'Tiedonvälitys propseilla',
   exercises: 7
 }
 const part3 = {
   name: 'Komponenttien tila',
   exercises: 14
 }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises} />
      <Total exercisesSum={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))