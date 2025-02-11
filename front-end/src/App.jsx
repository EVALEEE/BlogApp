import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(//将登录用户的详细信息保存在本地存储中
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const deleteBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setErrorMessage('delete success!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
      .catch(error => {
        setErrorMessage(`Error, delete unsuccessful: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        setErrorMessage('create success!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
      .catch(error => {
        setErrorMessage(`Error, create unsuccessful: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Blog app, Department of Computer Science, University of Helsinki 2022</em>
      </div>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blog = () => (
    <div>
      <form onSubmit={addBlog}>
        Title
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
        Author
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        URL
        <input
          type="text"
          value={newURL}
          name="url"
          onChange={({ target }) => setNewURL(target.value)}
        />
        <button type="submit">create</button>
      </form>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={() => deleteBlog(blog.id)} />
        )}
      </ul>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          {blog()}
        </div>
      }
      <Footer />
    </div>
  )
}

export default App