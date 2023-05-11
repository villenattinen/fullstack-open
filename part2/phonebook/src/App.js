import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input value={props.nameFilter} onChange={props.handleFilter} />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const personsToShow = props.persons.filter(
    person => person.name.toLocaleLowerCase().includes(
      props.nameFilter.toLocaleLowerCase()
    )
  )

  return (
    <div>
      {personsToShow.map(person =>
        <Person 
          key={person.id} 
          name={person.name} 
          number={person.number} 
          handleClick={() => props.deletePerson(person)}
        />
      )}
    </div>
  )
}

const Person = (props) => 
  <div>
    {props.name} {props.number}
    <button onClick={props.handleClick}>delete</button>
  </div>

const Notification = ({ message, className }) => {
  if (message === null || className === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [className, setClassName] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilter = (event) => {
    setNameFilter(event.target.value)
  }  
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotifyMessage(`Added ${newName}`)
          setClassName('notify')
          setTimeout(() => {
            setNotifyMessage(null)
            setClassName(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotifyMessage(`Couldn't add ${newName}`)
          setClassName('error')
          setTimeout(() => {
            setNotifyMessage(null)
            setClassName(null)
          }, 5000)
        })
    } else {
      updatePerson(person)
    }
  }

  const updatePerson = (person) => {
    const updatedPerson = { ...person, number: newNumber}
    if (window.confirm(
      `${newName} is already added to phonebook, replace the old number with a newone?`
    )) {
      personService
      .update(updatedPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson)
        )
        setNotifyMessage(`Updated ${newName}`)
        setClassName('notify')
        setTimeout(() => {
          setNotifyMessage(null)
          setClassName(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotifyMessage(`Information of ${newName} has already been removed from the server`)
        setClassName('error')
        setTimeout(() => {
          setNotifyMessage(null)
          setClassName(null)
        }, 5000)
      })
    } 
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(deletedPerson => deletedPerson.id !== person.id))
        setNotifyMessage(`Deleted ${person.name}`)
        setClassName('notify')
        setTimeout(() => {
          setNotifyMessage(null)
          setClassName(null)
        }, 5000)
      })
      .catch(error => {
        setNotifyMessage(`Information of ${person.name} has already been removed from the server`)
        setClassName('error')
        setTimeout(() => {
          setNotifyMessage(null)
          setClassName(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifyMessage} className={className}/>

      <Filter nameFilter={nameFilter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} nameFilter={nameFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
