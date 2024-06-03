require('express-async-errors')
require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const {
  requestLogger,
  morganLogger,
  unknownEndpointHandler,
  errorHandler
} = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('Starting connection to MongoDB...')
mongoose.connect(config.MONGODB_URI)
  .then(() => { logger.info('Server connected to MongoDB!') })
  .catch(error => logger.error('ERROR while connecting to MongoDB: ', error.message))

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(requestLogger)
if (process.env.NODE_ENV !== 'test') { app.use(morganLogger) }
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use(unknownEndpointHandler)
app.use(errorHandler)

module.exports = app
