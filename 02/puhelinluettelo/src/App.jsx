import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Note from '../components/Note'
const baseUrl = 'api/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', newName)

    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const ukko = {
        name : newName,
        number : newNumber
      }
      setPersons(persons.concat(ukko))

      axios.post(baseUrl, {
        name : newName,
        number : newNumber,
        id : Math.floor(Math.random() * 10000)
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNoteChange2 = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleNoteChange3 = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"filter shown with"} value={filter} handler={handleNoteChange3} />
      <h2>add a new</h2>
      <PersonForm handler={addNote} handler2={handleNoteChange} handler3={handleNoteChange2} 
        name={newName} number={newNumber}/>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
            <Note key={person.name} name={person.name} number = {person.number} filter={filter}/>
        )}
      </ul>
    </div>
  )

}

export default App
