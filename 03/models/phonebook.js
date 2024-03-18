const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log(URL)

mongoose.connect(URL)
  .then(result => {
    console.log('connected to db')
  })
  .catch((error) => {
    console.log("error connecting to")
  })

const phonebookSchema = new mongoose.Schema({
  name: {
      type: String, 
      minlength: 3,
      required: true
  },
  number: {
    type: String,
    required: true
  }
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)

