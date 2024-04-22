const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/blogs', async (request, response) => {
  
  const blog = await Blog.find({}).populate('user')
  if (blog) {
      response.json(blog)
  } else {
    response.status(404).end()
  } 
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/blogs', async (request, response) => {
  console.log("trying to add new blog")
  const body = request.body
  console.log(body)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  const blog = new Blog({
    author: body.author,
    url: body.url,
    user: user.id,
  })
  const savedBlog = await blog.save()
  response.json(savedBlog)
})


blogsRouter.post('/users', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


blogsRouter.get('/users', async (request, response) => {
  
  const user = await User.find({})
  if (user) {
      response.json(user)
  } else {
    response.status(404).end()
  } 
})

module.exports = blogsRouter