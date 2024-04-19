const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = (request, response, next) => {
  logger.info('-------------------------')
  logger.info('##########################')
  logger.info('----- REQUEST LOGGER -----')
  logger.info('')
  logger.info('method: ', request.method)
  logger.info('path:   ', request.path)
  logger.info('body:   ', request.body)
  logger.info('')

  next()
}

const unknownEndpointHandler = (req, res) => res.status(404).end()

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') { return response.status(400).send({ error: 'malformatted Id' }) }
  if (error.name === 'ValidationError') { return response.status(400).json({ error: error.message }) }

  next(error)
}

morgan.token('body', (req, res) => JSON.stringify(req.body))
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

module.exports = {
  requestLogger,
  morganLogger,
  unknownEndpointHandler,
  errorHandler
}
