import React from 'react'
import ReactDOM from 'react-dom'


const Total = props => {
    const exerciseTotal =
        props.parts.reduce((exerciseSum, part) => exerciseSum + part.exercises, 0)
    return <p>yhteensä {exerciseTotal} tehtävää</p>
}

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Header = props =>
    <h1>{props.course}</h1>

const Course = ({course}) => {

    const allParts = () => course.parts.map(part => 
        <Part key={part.id} part={part} />)

    return (
    <div>
        <Header course={course.name} />
        {allParts()}
        <Total parts={course.parts} />
    </div>
    )
}

const App = () => {
    const courses = [
        {
          name: 'Half Stack -sovelluskehitys',
          id: 1,
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
        },
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewaret',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]

    const allCourses = () => courses.map(course =>
        <Course key={course.id} course={course} />)

    return (
        <div>
            {allCourses()}
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)