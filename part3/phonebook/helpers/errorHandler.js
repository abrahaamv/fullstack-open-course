const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') { res.status(400).json({ error: 'malformatted Id' }) }
  next()
}

module.exports = errorHandler
