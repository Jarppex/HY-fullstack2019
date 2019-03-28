import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return <h1>{props.courseName}</h1>
}

const Content = (props) => {
    return (
        <div>
          <Part part={props.courseParts[0]} />
          <Part part={props.courseParts[1]} />
          <Part part={props.courseParts[2]} />
        </div>
      )
}

const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
}

const Total = (props) => {
    return (<p>yhteensä {
      props.courseParts[0].exercises+
      props.courseParts[1].exercises+
      props.courseParts[2].exercises
      } tehtävää</p>)
}

const App = () => {

  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))