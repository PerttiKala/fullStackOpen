  const PersonForm = ({handler, handler2, handler3, name, number}) => {
    return (
      <form onSubmit={handler}>
        <div>
          name: <input value={name} onChange={handler2}/>
        </div>
        <div>
          number: <input value={number} onChange={handler3}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default PersonForm
