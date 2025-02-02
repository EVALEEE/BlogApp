const { test, describe } = require('node:test')
const assert = require('node:assert')

const awmb = require('../utils/authorWithMostBlogs').authorWithMostBLogs

describe('authorWithMostBLogs', () => {
    test('empty blog array', () => {
        const blogs = []
        assert.strictEqual(awmb(blogs), null)
    })

    test('blog array with only one blog', () => {
        const blogs = [{ title: 'Blog 1', author: 'Robert C. Martin', likes: 5 }]
        assert.deepStrictEqual(awmb(blogs), { author: 'Robert C. Martin', blogs: 1 })
    })

    test('blog array with multiple blogs and with specific high level blogs', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Robert C. Martin', likes: 5 },
            { title: 'Blog 2', author: 'Robert C. Martin', likes: 12 },
            { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 17 }
        ]
        assert.deepStrictEqual(awmb(blogs), { author: 'Robert C. Martin', blogs: 2 })
    })

    test('blog array with multiple blogs and with unspecific high level blogs'), () => {
        const blogs = [
            { title: 'Blog 1', author: 'Robert C. Martin', likes: 5 },
            { title: 'Blog 2', author: 'Robert C. Martin', likes: 12 },
            { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 17 },
            { title: 'Blog 4', author: 'Edsger W. Dijkstra', likes: 10 },
            { title: 'Blog 5', author: 'Alice', likes: 27 }
        ]

        const result = awmb(blogs)

        const possibleResults = [
            { author: 'Edsger W. Dijkstra', blogs: 2 },
            { author: 'Robert C. Martin', blogs: 2 }
        ]
        assert.ok(
            possibleResults.some(blog =>
                blog.author === result.author &&
                blog.likes === result.likes
            ),
            'Result should match one of the possible blogs with maximum blogs'
        )
    }
})