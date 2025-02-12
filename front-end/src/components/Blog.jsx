import { useState, useRef } from 'react'

const Blog = ({ blog, deleteBlog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const blogRef = useRef()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
      )}
      <button onClick={() => deleteBlog(blog.id)}>remove</button>
    </div>
  )
}

export default Blog