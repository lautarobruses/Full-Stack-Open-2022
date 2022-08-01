// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((max, blog) => {
        return blog.likes > max ? blog.likes : max
    }, 0)

    if (maxLikes) {
        const blog = blogs.find(blog => blog.likes === maxLikes )

        const result = {
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }

        return result
    } else {
        return null
    }
}

const mostBlog = (blogs) => { //TERMINAR (4.6)
    const groups = blogs.groupBy(blogs, blogs.author)

    console.log(groups)
}

const mostLikes= (blogs) => { //TERMINAR (4.7)

    console.log(blogs)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}