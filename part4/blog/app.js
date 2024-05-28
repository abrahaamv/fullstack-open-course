require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')

const { requestLogger, unknownEndpointHandler, errorHandler } = middleware

mongoose.set('strictQuery', false)

logger.info('Starting server: connecting to database...')
mongoose.connect(config.MONGODB_URI)
  .then(() => { logger.info('Server connected to MongoDB!') })
  .catch(error => logger.error('Connection to MongoDB failed with ERROR: ', error.message))

const app = express()
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use(unknownEndpointHandler)
app.use(errorHandler)

module.exports = app
