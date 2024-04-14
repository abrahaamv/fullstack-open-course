
const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({course}) => {
  return (
    <>
    <Part part={course.parts[0].name}  exercises={course.parts[0].exercises}/>
    <Part part={course.parts[1].name}  exercises={course.parts[1].exercises}/>
    <Part part={course.parts[2].name}  exercises={course.parts[2].exercises}/>
    </>
  )
}

const Part = ({part, exercises}) =>   <p> {part} {exercises}</p>

const Total = ({course}) =>  <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default App