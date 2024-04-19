const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
})

blogRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) { res.json(blog) } else { res.status(404).end() }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
  const newBlog = req.body
  Blog.findOne({ title: newBlog.title })
    .then(success => {
      if (success) { return res.status(400).json({ error: 'title already exists' }) } else {
        const blog = new Blog({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          likes: newBlog.likes
        })

        blog.save()
          .then(savedBlog => res.json(savedBlog))
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

blogRouter.patch('/:id', (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedBlog => res.json(updatedBlog))
    .catch(error => next(error))
})

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(success => res.status(204).end())
    .catch(error => next(error))
})

module.exports = blogRouter
