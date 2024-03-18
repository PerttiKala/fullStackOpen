const mongoose = require('mongoose')


const dbName = "phoneApp"
const password = process.argv[2]

const url =
  `mongodb+srv://henrihosionaho1:${password}@cluster0.5dmus5w.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)


if (process.argv.length<4) {
  console.log("phonebook:")
  Phonebook.find({}).then(result => {
    result.forEach(note => {
      console.log(note.name + " " + note.number)
    })
    mongoose.connection.close()
  })
}

else {
  const note = new Phonebook({
    name: process.argv[3],
    number: process.argv[4]
  })
  
  note.save().then(result => {
    console.log('new number saved!')
    mongoose.connection.close()
  })
}
