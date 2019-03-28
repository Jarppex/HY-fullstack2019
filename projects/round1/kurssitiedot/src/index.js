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

 const course = 'Half Stack -sovelluskehitys'
 const parts = [
   {
    name: 'Reactin perusteet',
    exercises: 10
   },
   {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
   },
   {
    name: 'Komponenttien tila',
    exercises: 14
   }
 ]

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0].name} exercises1={parts[0].exercises}
        part2={parts[1].name} exercises2={parts[1].exercises}
        part3={parts[2].name} exercises3={parts[2].exercises} />
      <Total exercisesSum=
        {parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))