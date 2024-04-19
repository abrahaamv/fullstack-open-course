const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save
})

const api = supertest(app)

test('API responds whit a status 404 to a valid endpoint', async () => {
  await api.get('/api/random/endpoint')
    .expect(404)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 notes', async () => {
  const response = await api.get('/api/notes')
  assert(response.body.length === 1)
})

test('the third note is about HTML', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)

  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})
