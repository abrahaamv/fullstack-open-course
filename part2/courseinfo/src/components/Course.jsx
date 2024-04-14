
const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({course}) => course.parts.map(part => <Part part={part.name}  exercises={part.exercises}/>)

const Part = ({part, exercises}) =>   <p> {part} {exercises}</p>

const Total = ({course}) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)
  return <strong>Total of {totalExercises} exercises</strong>
} 

export function Course({course}) {

    return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default Course