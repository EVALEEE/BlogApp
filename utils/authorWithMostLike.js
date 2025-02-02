const lodash = require('lodash')

const authorWithMostLike = (blogs) => {
    if (blogs.length === 0) return null;

    // 按作者分组
    const groupedByAuthor = lodash.groupBy(blogs, 'author');

    // 将分组数据转换为 { author, likes } 格式
    const authorsWithLikes = lodash.map(groupedByAuthor, (blogs, author) => ({
        author,
        likes: lodash.sumBy(blogs, 'likes'), // 计算每个作者的总点赞数
    }));

    // 找到点赞数最多的作者
    return lodash.maxBy(authorsWithLikes, 'likes');
}

module.exports = { authorWithMostLike }