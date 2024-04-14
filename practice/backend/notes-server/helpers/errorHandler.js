const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted Id' })
  } else if (error.name === 'ValidationError') { return response.status(400).json({ error: error.message }) }
  next(error)
}
module.exports = errorHandler