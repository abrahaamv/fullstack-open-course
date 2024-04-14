require('dotenv').config()
const mongoose = require('mongoose')
const { model, Schema } = mongoose

const url = process.env.MONGODB_URI

async function mongodbConnection () {
  await mongoose.connect(url)
    .then(success => console.log('Server connected to MongoDB!'))
    .catch(error => console.log('ERROR while connecting to MongoDB: ', error.message))
}

console.log('Starting connection to MongoDB...')
mongodbConnection()

mongoose.set('strictQuery', true)

const noteSchema = new Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Note', noteSchema)
