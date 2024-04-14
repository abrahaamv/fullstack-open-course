import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook.js'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import Button from './components/Button'
import PhonebookInfo from './components/PhonebookInfo'
import Notification from './components/Notification'


export default function App (){
const [ phonebookData, setPhonebookData ] = useState([])
const [ newName, setNewName ] = useState('')
const [ newNumber, setNewNumber ] = useState('')
const [ filter, setFilter ] = useState('')
const [ notification, setNotification ] = useState({ message: null, type: null })
useEffect(() => {
  phonebookServices
  .getAll()
  .then(phonebookData => setPhonebookData(phonebookData))
  .catch(error => {
    setNotification({ message: 'Error while recovering data from server', type: 'error'})
    setTimeout(() => {
      setNotification({ message: null, type: null})
    }, 10000)
    console.log('No data recovered from server, error:', error.message)
  })
}, [])

const handlePersonFormSubmit = (e) => {
  e.preventDefault()    
  if (!newName || !newNumber) { return alert('please enter both name and number') }

  const newPerson = { name: newName, number: newNumber }
  
  const alreadyRegistered = phonebookData.find(person => person.name === newName)

  if (alreadyRegistered) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          phonebookServices
            .updateOne(alreadyRegistered, newPerson)
            .then(updatedPerson => {
              setPhonebookData(phonebookData.map(person => person.name != updatedPerson.name ? person : updatedPerson))
              setNotification({ message: `${updatedPerson.name}'s number updated successfully`, type: 'success'})
              setTimeout(() => {
                setNotification({ message: null, type: null})
              }, 3000)
            })
          setNewName('')
          setNewNumber('')
          }
     } else {
              phonebookServices
                .createPerson(newPerson)
                .then(returnedPersonData => {
                  setPhonebookData([...phonebookData, returnedPersonData])
                  setNotification({ message: `${returnedPersonData.name} added to phonebook successfully`, type: 'success'})
                  setTimeout(() => {
                    setNotification({ message: null, type: null})
                  }, 3000)
                })
              setNewName('')
              setNewNumber('')
        }
    }

const handleDeletePerson = (personToDelete) => {
  if(!window.confirm(`Delete ${personToDelete.name}?`)){ return }

  phonebookServices
  .deleteOne(personToDelete.id)
  .then(res => {
    setPhonebookData(phonebookData.filter(person => person.id != personToDelete.id))
    setNotification({ message: `${personToDelete.name} removed from phonebook successfully`, type: 'success'})
    setTimeout(() => {
      setNotification({ message: null, type: null})
    }, 3000)
  })
  .catch(error => {
    setNotification({ message: `${personToDelete.name} is already removed from phonebook`, type: 'error'})
    setTimeout(() => {
    setNotification({ message: null, type: null})
    }, 3000)
    console.log(error.message)
    setPhonebookData(phonebookData.filter(person => person.id !== personToDelete.id))
  })
}

const persons = filter
? phonebookData.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
: phonebookData

  return (
    <>
    <h1>Phonebook</h1>
    <Notification message={notification.message} type={notification.type}/>
    <Filter filterValue={filter} onFilterChange={e => setFilter(e.target.value)}/>

    <h1>add a new</h1>
    <PersonForm onFormSubmit={handlePersonFormSubmit}>
      <Input inputLabel='name' inputValue={newName} onInputChange={e => setNewName(e.target.value)} />
      <Input inputLabel='number' inputValue={newNumber} onInputChange={e => setNewNumber(e.target.value)} />
      <Button buttonText='Add' buttonType='submit'/>
    </PersonForm>

    <h1>Numbers</h1>
    <PhonebookInfo persons={persons} handleClick={handleDeletePerson}/>
    </>
  )
}