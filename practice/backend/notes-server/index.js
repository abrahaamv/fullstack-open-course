require('dotenv').config()
const express = require('express')
const cors = require('cors')
const requestLogger = require('./helpers/requestLogger.js')
const morganLogger = require('./helpers/morganLogger.js')
const unknownEndpointHandler = require('./helpers/unknownEndpointHandler.js')
const errorHandler = require('./helpers/errorHandler.js')
const Note = require('./models/note')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(requestLogger)
app.use(morganLogger)

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      if (notes) { response.json(notes) } else { response.status(404).end() }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) { response.json(note) } else { response.status(404).end() }
    })
    .catch(error => next(error))
})

app.post('/api/notes/', (request, response, next) => {
  const body = request.body

  const newNote = new Note({
    content: body.content,
    important: body.important || false
  })

  newNote.save()
    .then(savedNote => response.send(savedNote))
    .catch(error => next(error))
})

app.patch('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findOneAndUpdate({ _id: request.params.id }, { content, important }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findOneAndDelete({ _id: request.params.id })
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.use(unknownEndpointHandler)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started, running on PORT: ${PORT}`))
