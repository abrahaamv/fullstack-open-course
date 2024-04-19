const mongoose = require('mongoose')
const logger = require('./utils/logger')

if (process.argv.length < 3) {
  logger.info('give a password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://abrahaam:${password}@enategacluster.f7heyxy.mongodb.net/notesApp?retryWrites=true&w=majority&appName=enategaCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note.toJSON())
  })
  mongoose.connection.close()
})
