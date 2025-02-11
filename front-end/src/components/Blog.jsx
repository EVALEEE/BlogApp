const Blog = ({ blog, deleteBlog }) => (
  <div>
    {blog.title} {blog.author}
    <button onClick={deleteBlog}>delete</button>
  </div>
)

export default Blog