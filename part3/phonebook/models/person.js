require('dotenv').config()
const mongoose = require('mongoose')
const { model, Schema } = mongoose

const url = process.env.MONGODB_URI

async function mongodbConnection () {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(url)
    .then(result => console.log('Connected Succesfully!'))
    .catch(error => console.log('Error while trying to connect to MongoDB, error:', error.message))
}

console.log('Starting connection to Database...')
mongodbConnection()

mongoose.set('strictQuery', false)

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}-[0-9]{4,}$/g.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Person', personSchema)
