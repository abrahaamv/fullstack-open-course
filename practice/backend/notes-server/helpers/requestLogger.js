const requestLogger = (request, response, next) => {
  console.log('-------------------------')
  console.log('##########################')
  console.log('----- REQUEST LOGGER -----')
  console.log('')
  console.log('method: ', request.method)
  console.log('path:   ', request.path)
  console.log('body:   ', request.body)
  console.log('')

  next()
}

module.exports = requestLogger
