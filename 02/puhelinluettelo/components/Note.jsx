  const Note = ({ name, number, filter }) => {
    console.log(name)
    if (name.includes(filter)) {
      return (
        <li>{name} {number}</li>
      )
    }
  }

export default Note

