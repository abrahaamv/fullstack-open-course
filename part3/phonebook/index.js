require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const requestLogger = require('./helpers/requestLogger')
const errorHandler = require('./helpers/errorHandler')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(requestLogger)

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (req, res) => res.status(404).end()

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.send(`<div><p>Phonebook has info  ${persons.length} for people</p><p>${new Date()}</p></div>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/', (req, res, next) => {
  Person.find({})
    .then(persons => res.send(persons))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) { res.json(person) } else { res.status(404).end() }
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
  const newPerson = req.body
  if (!newPerson.name || !newPerson.number) { return res.status(404).json({ error: 'Both name and number are required' }) }
  Person.findOne({ name: newPerson.name })
    .then(result => {
      if (result) { return res.status(400).json({ error: 'Name must be unique' }) } else {
        const person = new Person({
          name: newPerson.name,
          number: newPerson.number
        })

        person.save()
          .then(savedPerson => res.send(savedPerson))
      }
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const updatedPerson = req.body
  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) { res.json(updatedPerson) } else { res.status(404).send() }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(deletedPerson => res.status(204).end())
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Server started, running on PORT ${PORT}`) })
