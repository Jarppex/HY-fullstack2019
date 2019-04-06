import React from 'react'
import ReactDOM from 'react-dom'

/*
const Total = props => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return <p>yhteensä {total} tehtävää</p>
}
//<Total parts={course.parts} />
*/

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Header = props =>
    <h1>{props.course}</h1>

const Course = ({course}) => {

    const parts = () => course.parts.map(part => 
        <Part key={part.id} part={part} />)

    return (
    <div>
        <Header course={course.name} />
        {parts()}
    </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10,
            id: 1
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7,
            id: 2
          },
          {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
          }
        ]
      }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)