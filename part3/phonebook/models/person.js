require('dotenv').config()
const mongoose = require('mongoose')
const { model, Schema } = mongoose

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB...')
mongoose.connect(url)
  .then(result => console.log('Connected Succesfully!'))
  .catch(error => console.log('Error while trying to connect to MongoDB, error:', error.message))

mongoose.set('strictQuery', false)

const personSchema = new Schema({
  name: String,
  number: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Person', personSchema)
