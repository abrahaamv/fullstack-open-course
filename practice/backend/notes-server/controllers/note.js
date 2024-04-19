const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({})
    .then(notes => {
      if (notes) { response.json(notes) } else { response.status(404).end() }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) { response.json(note) } else { response.status(404).end() }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const newNote = new Note({
    content: body.content,
    important: body.important || false
  })

  newNote.save()
    .then(savedNote => response.send(savedNote))
    .catch(error => next(error))
})

notesRouter.patch('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findOneAndUpdate({ _id: request.params.id }, { content, important }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findOneAndDelete({ _id: request.params.id })
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

module.exports = notesRouter
