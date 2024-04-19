const dummy = (blog) => {
  return blog
    ? 1
    : 0
}

const totalLikes = (blog) => {
  return blog.length > 0
    ? blog.map(post => post.likes).reduce((prevValue, actualValue) => prevValue + actualValue)
    : 0
}

const favoriteBlog = (blog) => {
  const mostLikedPost = blog.find(post => post.likes === blog.map(post => post.likes).reduce((prevValue, actualValue) => prevValue > actualValue ? prevValue : actualValue))

  return {
    title: mostLikedPost.title,
    author: mostLikedPost.author,
    likes: mostLikedPost.likes
  }
}

const mostBlogs = (blog) => {
  const authors = blog.map(post => post.author).map(author => { return { author, blogs: 1 } })
  const allBlogs = authors.reduce((acc, curr) => {
    const existingAuthor = acc.find(item => item.author === curr.author)
    if (existingAuthor) {
      existingAuthor.blogs += curr.blogs
    } else {
      acc.push({ author: curr.author, blogs: curr.blogs })
    }
    return acc
  }, [])

  return allBlogs.reduce((prevValue, actualValue) => prevValue > actualValue ? prevValue : actualValue)
}

const mostLikes = (blog) => {
  const allLikes = blog.map(post => { return { author: post.author, likes: post.likes } })
  const mostLikes = allLikes.reduce((acc, curr) => {
    const existingAuthor = acc.find(item => item.author === curr.author)
    if (existingAuthor) {
      existingAuthor.likes += curr.likes
    } else {
      acc.push({ author: curr.author, likes: curr.likes })
    }
    return acc
  }, [])

  return mostLikes.reduce((prevValue, actualValue) => prevValue > actualValue ? prevValue : actualValue)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
