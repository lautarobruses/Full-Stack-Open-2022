import React, { useEffect, useState } from 'react'
import Persons from './Persons'
import Input from './Input'
import PersonForm from './PersonForm'
import contactService from '../services/contacts'
import Notification from './Notification'
import Error from './Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    const person = persons.find(person => (person.name === newName))

    event.preventDefault()
    if (newName !== '') {
      if (person) {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
          updateNumber(person)
        }
        setNewName('')
        setNewNumber('')
      } else {
        const newContact = {name: newName, number: newNumber}
        contactService
          .create(newContact)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Added ${newContact.name}` )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(error.response.data)
          })
      }
    }
  }

  const deleteContactOf = (id) => {
    const person = persons.find(n => n.id === id)
    const result = window.confirm(`Do you really want to delete ${person.name}?`)

    if (result) {
      contactService.deleteIt(id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationMessage(`Deleted ${person.name}` )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const updateNumber = (oldContact) => {
    const changedContact = {...oldContact, number: newNumber}

    contactService
      .update(oldContact.id, changedContact)
      .then(returnedContact => {
        setPersons(persons.map(person => person.id === oldContact.id ? returnedContact : person))
        setNotificationMessage(`Updated ${changedContact.name} number` )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000);
      })
      .catch(error => {
        setErrorMessage(error.response.data)
        //setErrorMessage(`Contact ${changedContact.name} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setPersons(persons.filter(n => n.id !== changedContact.id))
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
    if (event.target.value === '')
      setShowAll(true)
    else
      setShowAll(false)
  }

  const contactsToShow = showAll ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Input 
        text='Filter shown with:' 
        value={filter} 
        onChange={handleFilterChange} 
      /> 
      <h2>Add a new contact</h2>
      <PersonForm 
        onSubmit={addContact} 
        value1={newName} 
        value2={newNumber} 
        onChange1={handleNameChange} 
        onChange2={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        contacts={contactsToShow}
        deleteContactOf={deleteContactOf} 
      />
    </>
  )
}

export default App