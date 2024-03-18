require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Phonebook = require('./models/phonebook')


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req, res) === 'POST') {
    console.log("yeet")
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }
  else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}))


app.get('/info', (request, response) => {
  let date = new Date
  let amount = persons.length
  let str = "<p>Phoneboook has info for " + amount + " people</p>"
  str = str + "<p>" + date + "</p>" 
  response.send(str)
})


app.get('/api/persons', (request, response, next) => {
  console.log("phonebook:")
  Phonebook.find({}).then(result => {
    response.json(result)})
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('File not found')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log(request.params)
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const name = persons.find(pers => pers.name == body.name)
  if (name) {
    return response.status(409).json({
      error: 'name must be unique'
    })
  }

  const person = new Phonebook ({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random * 1000)
  })

  persons = persons.concat(person)

  response.json(person)
  
  person.save().then(result => {
    console.log('new number saved!')
  })
  .catch(error => {
    console.log(errorHandler.response.data)
  })
})

const PORT = process.env.PORT ||defaultPORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.use(errorHandler)