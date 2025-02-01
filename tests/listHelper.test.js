const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper').dummy

describe('listHelper', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper(blogs)
        assert.strictEqual(result, 1)
    })

    test('dummy returns one with single blog', () => {
        const blogs = [
            {
                title: 'Test blog',
                author: 'Test author',
                url: 'http://test.com',
                likes: 5
            }
        ]
        const result = listHelper(blogs)
        assert.strictEqual(result, 1)
    })

    test('dummy returns one with multiple blogs', () => {
        const blogs = [
            {
                title: 'First blog',
                author: 'First author',
                url: 'http://first.com',
                likes: 5
            },
            {
                title: 'Second blog', 
                author: 'Second author',
                url: 'http://second.com',
                likes: 10
            }
        ]
        const result = listHelper(blogs)
        assert.strictEqual(result, 1)
    })
})