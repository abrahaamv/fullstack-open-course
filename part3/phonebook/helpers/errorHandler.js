const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') { res.status(400).json({ error: 'malformatted Id' }) }
  if (error.name === 'ValidationError') { res.status(400).json({ error: 'Invalid  phone or number' }) }
  next(error)
}

module.exports = errorHandler
