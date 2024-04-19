const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/note')
const logger = require('./utils/logger')
const {
  requestLogger,
  morganLogger,
  unknownEndpointHandler,
  errorHandler
} = require('./utils/middleware')

mongoose.set('strictQuery', false)

console.log('Starting connection to MongoDB...')
mongoose.connect(config.MONGODB_URI)
  .then(success => logger.info('Server connected to MongoDB!'))
  .catch(error => logger.error('ERROR while connecting to MongoDB: ', error.message))

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(requestLogger)
app.use(morganLogger)
app.use('/api/notes', notesRouter)
app.use(unknownEndpointHandler)
app.use(errorHandler)

module.exports = app
