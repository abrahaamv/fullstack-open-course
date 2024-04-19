const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('****************************')
  logger.info('----------------------------')
  logger.info('')
  logger.info('REQUEST LOGGER:')
  logger.info('method: ', req.method)
  logger.info('path:   ', req.path)
  logger.info('body:   ', req.body)
  logger.info('')
  logger.info('-----------------------------')
  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') { return res.status(400).json({ error: 'malformatted Id' }) }
  if (error.name === 'ValidationError') { return res.status(400).json({ error: 'Validation Error, enter valid info' }) }
}

const unknownEndpointHandler = (req, res, next) => res.status(404).end()

module.exports = { requestLogger, unknownEndpointHandler, errorHandler }
