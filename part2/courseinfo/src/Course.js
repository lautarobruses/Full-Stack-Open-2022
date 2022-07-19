const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, parts) => {
    return sum + parts.exercises
  }, 0)

  return (
    <>
      <b>
        <p>Total of {sum} exercises</p>
      </b>
    </>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
          <Part key={part.id} part={part} />
        )
      )}     
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course