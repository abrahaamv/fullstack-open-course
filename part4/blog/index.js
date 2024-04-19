const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

app.listen(config.PORT, () => { logger.info(`Server started, running on PORT: ${config.PORT}`) })
