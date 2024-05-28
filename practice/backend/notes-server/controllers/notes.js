const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})

  notes
    ? response.json(notes)
    : response.status(404).end()
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)

  note
    ? response.json(note)
    : response.status(404).end()
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const newNote = new Note({
    content: body.content,
    important: body.important || false
  })

  const savedNote = await newNote.save()
  savedNote
    ? response.status(201).json(savedNote)
    : response.status(400).end()
})

notesRouter.patch('/:id', async (request, response) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
  updatedNote
    ? response.json(updatedNote)
    : response.status(400).end()
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
  updatedNote
    ? response.json(updatedNote)
    : response.status(400).end()
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
