const { test } = require('node:test')
const assert = require('node:assert')

//测试文件导入要测试的函数，并将其分配给名为 reverse 的变量
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
})
