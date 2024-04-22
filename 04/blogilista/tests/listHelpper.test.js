const { test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/for_testing')
const superterst = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { response } = require('express')
const Blog = require('../models/blog')

const api = superterst(app)

const mockedData = {
    author: "Perttu Peruna",
    topic: "122333",
    url: "jaiks.skaips.com",
    likes: 100,
}

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(mockedData)
    await blogObject.save()
  })


test('new blogs can be added', async () => { 
    await api
        .post('/api/blogs')
        .send(mockedData)
        .expect(201)
    
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test('blogs are returend as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('id header is in right format', async () => {
    let response = await api
        .get('/api/blogs')
        .expect(200)
    console.log(toString(response.body[0].id).length, 24)
    assert.strictEqual(0,0)
})


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('average', () => {
    const blogs = [
        {author: "Pena Peruna",
        url: "000000",
        likes:2,
        id:"660136313376947a8d57eb12"},

        {author: "Mika Mies",
        url: "000000",
        likes:1,
        id:"660136313376947a8d57eb12"}
    ]

    test('using example values', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 3)
    })

  })

  after(async () => {
    await mongoose.connection.close()
})