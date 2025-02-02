const lodash = require('lodash')

const authorWithMostBLogs = (blogs) => {
    if (blogs.length === 0) return null;

    // 按作者分组
    const groupedByAuthor = lodash.groupBy(blogs, 'author');

    // 将分组数据转换为 { author, blogs } 格式
    const authorsWithBlogCount = lodash.map(groupedByAuthor, (blogs, author) => ({
        author,
        blogs: blogs.length,
    }));

    // 找到博客数量最多的作者
    return lodash.maxBy(authorsWithBlogCount, 'blogs');
}

module.exports = { authorWithMostBLogs }