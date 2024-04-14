const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give a password as argument')
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

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
