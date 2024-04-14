import { useState, useEffect } from 'react'
import noteServices from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

function App() {
  const [ notes, setNotes ] = useState([])
  const [ value, setValue ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notification, setNotification ] = useState({ message: null, type: null})
 
useEffect(() => {
  noteServices
  .getAll()
  .then(initialNotes => setNotes(initialNotes)) 
},[])

  const addNote = (e) => {
    e.preventDefault()

    if(!value) return alert('Introduce a valid note!')
 
    const newNote = { 
      content: value, 
      important: Math.random() < 0.5 
    }
    
    noteServices
    .createNote(newNote)
    .then(createdNote => setNotes([...notes, createdNote]))

    setValue('')
  }
    

    const handleChange  = (e) => {
      setValue(e.target.value)
    }

    const toogleNoteImportance = (note) => {
      noteServices
      .updateNote(note.id,  { important: !note.important })
      .then(updatedNote => setNotes(notes.map(note => note.id !== updatedNote.id ? note : updatedNote)))
      .catch(error => {
          setNotification({ message: `Note '${note.content}' was already removed from server, error: ${error.message}`, type: 'error'} )

          setTimeout(() => { setNotification({ message: null, type: null }) }, 5000)

          setNotes(notes.filter(filteredNote => filteredNote.id != note.id))
        })
    }

    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} type={notification.type}/>
      <button onClick={()  => setShowAll(!showAll)}>Show {showAll ? 'important' : 'All'}</button>
      <ul>
        {notesToShow?.map(note => 
          <Note key={note.id} note={note} handleClick={()=> toogleNoteImportance(note)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
        onChange={handleChange}
        value={value}
        />
        <button>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App