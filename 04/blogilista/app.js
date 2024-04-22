const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/login/', loginRouter)
app.use('/api/', blogsRouter)


const URL = config.MONGODB_URI
mongoose.connect(URL)

module.exports = app