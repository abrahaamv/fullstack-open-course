const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const Note = require('../models/note')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(noteObject => noteObject.save())
  await Promise.all(promiseArray)
})

test('API responds with a status 404 to a valid endpoint', async () => {
  await api.get('/api/random/endpoint')
    .expect(404)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 notes', async () => {
  const notesAtEnd = await helper.notesInDb()
  assert(notesAtEnd.length === 2)
})

test('the first note is about HTML', async () => {
  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(note => note.content)

  assert(contents.includes('HTML is easy'))
})

test('A valid note can be added', async () => {
  const newNote = {
    content: 'New valid Note',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(note => note.content)

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
  assert(contents.includes('New valid Note'))
})

test('note without content is not added', async () => {
  const invalidNote = { content: '' }

  await api
    .post('/api/notes')
    .send(invalidNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()
  const contents = notesAtEnd.map(note => note.content)

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  assert(!contents.includes(''))
})

test('A specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api.get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('A specific note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api.delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()
  const contents = notesAtEnd.map(note => note.content)

  assert(!contents.includes(noteToDelete.content))
  assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
