const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises </b>

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b)

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course
