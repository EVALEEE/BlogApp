const { test, describe } = require('node:test')
const assert = require('node:assert')

const favoriteBlog = require('../utils/favoriteBlog').favoriteBlog

describe('favoriteBlog', () => {
    test('returns the blog with the most likes', () => {
        const blogs = [
            { title: 'Blog A', author: 'Author A', likes: 5 },
            { title: 'Blog B', author: 'Author B', likes: 10 },
            { title: 'Blog C', author: 'Author C', likes: 7 }
        ]
        const result = favoriteBlog(blogs)
        assert.deepStrictEqual(result, { title: 'Blog B', author: 'Author B', likes: 10 })
    })

    test('returns the blog with the most likes but there are some blogs with the same num of likes', () => {
        const blogs = [
            { title: 'Blog A', author: 'Author A', likes: 5 },
            { title: 'Blog B', author: 'Author B', likes: 0 },
            { title: 'Blog C1', author: 'Author C1', likes: 7 },
            { title: 'Blog C2', author: 'Author C2', likes: 7 },
            { title: 'Blog C3', author: 'Author C3', likes: 7 },
            { title: 'Blog D', author: 'Author D', likes: 1 },
        ]
        const result = favoriteBlog(blogs)
        const possibleResults = [
            { title: 'Blog C1', author: 'Author C1', likes: 7 },
            { title: 'Blog C2', author: 'Author C2', likes: 7 },
            { title: 'Blog C3', author: 'Author C3', likes: 7 }
        ]

        assert.ok(
            possibleResults.some(blog =>
                blog.title === result.title &&
                blog.author === result.author &&
                blog.likes === result.likes
            ),
            'Result should match one of the possible blogs with maximum likes'
        )
    })
})