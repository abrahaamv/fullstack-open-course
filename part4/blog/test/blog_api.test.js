const { beforeEach, describe, test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./blog_api_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogsObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET /api/blogs', () => {
  test('All blogs are returned as JSON', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(blogs.body.length, helper.blogs.length)
  })

  test('Identifier property is named: id', async () => {
    const blogs = await helper.blogsInDb()
    assert(Object.getOwnPropertyDescriptor(blogs[0], 'id'))
  })
})

describe('POST /api/blogs', () => {
  test('blog is saved successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Developer essentials: JavaScript console methods',
      author: 'Brian Smith',
      url: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/',
      likes: 7
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogsTitles = blogsAtEnd.map(blog => blog.title)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    assert(blogsTitles.includes(newBlog.title))
  })

  test('If likes property is missing, 0 is the default value', async () => {
    const newBlog = {
      title: 'Developer essentials: JavaScript console methods',
      author: 'Brian Smith',
      url: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/'
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(savedBlog.body.likes, 0)
  })

  test('Blog will not be saved if title or url properties are missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const noTitleBlog = {
      author: 'Brian Smith',
      url: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/',
      likes: 10
    }

    const noUrlBlog = {
      title: 'Developer essentials: JavaScript console methods',
      author: 'Brian Smith',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert(blogsAtStart.length, blogsAtEnd.length)
  })
})

describe('DELETE /api/blogs', () => {
  test('especific blog can be deleted', async () => {
    const blogs = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogs.length - 1)
    assert(!blogsAtEnd.map(blog => blog.title).includes(blogs[0].title))
  })
})

describe('PATCH /api/blogs', () => {
  test('specific blog can be updated', async () => {
    const blogs = await helper.blogsInDb()
    await api
      .patch(`/api/blogs/${blogs[0].id}`)
      .send({ likes: blogs[0].likes + 1 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd[0].likes, blogs[0].likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
