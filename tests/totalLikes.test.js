const { test, describe } = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/like_helper').totalLikes

describe('totalLikes', () => {
    test('totalLikes returns 0 with no blogs', () => {
        const blogs = []
        const result = totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('totalLikes returns likes with single blog', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }]

        const result = totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('totalLikes returns likes with multiple blogs', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 1,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'React patterns',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 4,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'React patterns',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 6,
                __v: 0
            }]
        const result = totalLikes(blogs)
        assert.strictEqual(result, 11)
    })
})