const Course = ({course}) => {

  const parts = course.parts
  
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  console.log(total)
  
  const Part = (part) => {
      return (
        <li>{part.name} {part.exercises}</li>
      )
  }
  
  return (
    <>
      <h2> {course.name} </h2>
      <ul>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
      <h3>total of {total} exercises</h3>
    </>
  )
  }

  export default Course