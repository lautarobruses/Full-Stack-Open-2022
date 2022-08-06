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

const mostBlog = (blogs) => {
    let filteredAuthors = []
    let result = {
        author: '',
        blogs: 0
    }

    for(let i = 0; i < blogs.length; i++) {
        let j = 0

        while (j < filteredAuthors.length && filteredAuthors[j].author !== blogs[i].author) {
            j++
        }

        if(filteredAuthors[j]?.author === blogs[i].author) {
            filteredAuthors[j].blogs++
        } else {
            filteredAuthors[j] = { author: blogs[i].author, blogs: 1 }
        }
    }

    filteredAuthors.forEach(element => {
        element.blogs > result.blogs && (result = element)
    })

    return result
}

const mostLikes = (blogs) => {
    let filteredAuthors = []
    let result = {
        author: '',
        likes: 0
    }

    for(let i = 0; i < blogs.length; i++) {
        let j = 0

        while (j < filteredAuthors.length && filteredAuthors[j].author !== blogs[i].author) {
            j++
        }

        if(filteredAuthors[j]?.author === blogs[i].author) {
            filteredAuthors[j].likes += blogs[i].likes
        } else {
            filteredAuthors[j] = { author: blogs[i].author, likes: blogs[i].likes }
        }
    }

    filteredAuthors.forEach(element => {
        element.likes > result.likes && (result = element)
    })

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}