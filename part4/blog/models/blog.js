const mongoose = require('mongoose')
const { model, Schema } = mongoose

const blogSchema = new Schema({
  title: {
    type: String,
    minLength: 3
  },
  author: {
    type: String,
    minLength: 3
  },
  url: {
    type: String,
    minLength: 9
  },
  likes: {
    type: Number
  }

})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Blog', blogSchema)
