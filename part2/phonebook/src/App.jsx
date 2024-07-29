import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import Filter from './Filter'
import PersonForm from './PersonForm '
import Persons from './Persons '
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        setShowAll(true)
      })
  }, [])

  const addContact = (event) => {
    const existingPerson = persons.find(person => (person.name === newName))

    event.preventDefault()
    if (newName !== '' && newNumber !== '') {
      if (existingPerson) {
        if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          updateNumber(existingPerson)
        }
      } else {
        const newContact = {name: newName, number: newNumber}
        
        contactService
          .create(newContact)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))

            const newNotification = {
              message: `Added ${newContact.name}`,
              error: false
            }

            setNotification(newNotification)
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          // .catch(error => {
          //   console.log(error.response);
          //   const newError = {
          //     message: error.response.data,
          //     error: true
          //   }

          //   setNotification(newError)
          //   setTimeout(() => {
          //     setNotification(null)
          //   }, 5000);
          // })
      }

      setNewName('')
      setNewNumber('')
    }
  }

  const deleteContactOf = (id) => {
    const person = persons.find(n => n.id === id)
    const result = window.confirm(`Do you really want to delete ${person.name}?`)

    if (result) {
      contactService.deleteIt(id)
      setPersons(persons.filter(person => person.id !== id))

      const newNotification = {
        message: `Deleted ${person.name} from server`,
        error: false
      } 

      setNotification(newNotification)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const updateNumber = (oldContact) => {
    const changedContact = {...oldContact, number: newNumber}

    contactService
      .update(oldContact.id, changedContact)
      .then(returnedContact => {
        setPersons(persons.map(person => person.id === oldContact.id ? returnedContact : person))

        const newNotification = {
          message: `Updated ${changedContact.name} number`,
          error: false
        }

        setNotification(newNotification)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
      .catch(error => {
        const newError = {
          message: `${error.response.data}: Information of '${changedContact.name}' has already been removed from server`,
          error: true
        }

        setNotification(newError)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(event.target.value === '')
  }

  const contactsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>

      {/* <Notification 
        message={notification ? notification.message : null}
        error={notification ? notification.error : null}
      /> */}

      {notification
        ? <Notification message={notification.message} error={notification.error}/>
        : null
      }

      <Filter filter={filter} handleChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addContact}
        nameValue={newName} 
        numberValue={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        contacts={contactsToShow}
        deleteContactOf={deleteContactOf} 
      />
    </>
  )
}

export default App