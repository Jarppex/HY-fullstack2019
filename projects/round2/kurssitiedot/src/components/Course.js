import React from 'react'

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

export default Course