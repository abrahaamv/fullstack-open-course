const { test, describe } = require('node:test')
const assert = require('node:assert')
const { emptyBlog, listWithOneBlog, blogs } = require('./list_helper')
const listHelper = require('../helpers/list_helper')

describe('total likes', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(emptyBlog)
    assert.strictEqual(result, 1)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlog)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0].likes)
  })

  test('of  bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 59)
  })

  test('of most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)

    const mostLikedPost = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 23
    }

    assert.deepStrictEqual(result, mostLikedPost)
  })
})

test('most blogs', () => {
  const result = listHelper.mostBlogs(blogs)
  const mostBlogs = { author: 'Robert C. Martin', blogs: 3 }
  assert.deepStrictEqual(result, mostBlogs)
})

test('most liked author', () => {
  const result = listHelper.mostLikes(blogs)
  const mostLikedAuthor = { author: 'Robert C. Martin', likes: 35 }
  assert.deepStrictEqual(result, mostLikedAuthor)
})
