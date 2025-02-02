const { test, describe } = require('node:test')
const assert = require('node:assert')

const awml = require('../utils/authorWithMostLike').authorWithMostLike

describe('authorWithMostLike', () => {
    test('empty blog array', () => {
        const blogs = []
        assert.strictEqual(awml(blogs), null)
    })

    test('blog array with only one blog', () => {
        const blogs = [{ title: 'Blog 1', author: 'Robert C. Martin', likes: 5 }]
        assert.deepStrictEqual(awml(blogs), { author: 'Robert C. Martin', likes: 5 })
    })

    test('blog array with multiple blogs and with specific high level likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Robert C. Martin', likes: 5 },
            { title: 'Blog 2', author: 'Robert C. Martin', likes: 12 },
            { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 17 },
            { title: 'Blog 4', author: 'Edsger W. Dijkstra', likes: 10 },
        ]
        assert.deepStrictEqual(awml(blogs), { author: 'Edsger W. Dijkstra', likes: 27 })
    })

    test('blog array with multiple blogs and with unspecific high level likes'), () => {
        const blogs = [
            { title: 'Blog 1', author: 'Robert C. Martin', likes: 5 },
            { title: 'Blog 2', author: 'Robert C. Martin', likes: 12 },
            { title: 'Blog 3', author: 'Edsger W. Dijkstra', likes: 17 },
            { title: 'Blog 4', author: 'Edsger W. Dijkstra', likes: 10 },
            { title: 'Blog 5', author: 'Alice', likes: 27 }, // 并列最高点赞数
        ]

        const result = awml(blogs)

        const possibleResults = [
            { author: 'Edsger W. Dijkstra', likes: 27 },
            { author: 'Alice', likes: 27 }
        ]
        assert.ok(
            possibleResults.some(blog =>
                blog.author === result.author &&
                blog.likes === result.likes
            ),
            'Result should match one of the possible blogs with maximum likes'
        )
    }
})