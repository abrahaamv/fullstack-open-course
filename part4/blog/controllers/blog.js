const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  blogs
    ? res.send(blogs)
    : res.status(404).end()
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog
    ? res.send(blog)
    : res.status(404).end()
})

blogRouter.post('/', async (req, res) => {
  const newBlog = req.body
  if (!newBlog.title || !newBlog.url) { return res.status(400).end() }

  const blog = await Blog.findOne({ title: newBlog.title })
  if (blog) { return res.status(400).json({ error: 'title already exists' }) } else {
    const blog = new Blog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes || 0
    })

    const savedBlog = await blog.save()
    savedBlog
      ? res.status(201).json(savedBlog)
      : res.status(400).end()
  }
})

blogRouter.patch('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  updatedBlog
    ? res.send(updatedBlog)
    : res.status(404).end()
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter
