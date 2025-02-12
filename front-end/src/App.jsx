import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm.jsx'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
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

  const handleLike = (id) => {
    const blogToUpdate = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === id ? returnedBlog : b))
      })
      .catch(error => {
        setErrorMessage(`Error, like unsuccessful: ${error}`)
        setTimeout(() => setErrorMessage(null), 3000)
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

  const loginForm = () => {
    return (
      < Togglable buttonLabel='log in' >
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable >
    )
  }

  const blog = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            deleteBlog={() => deleteBlog(blog.id)}
            handleLike={() => handleLike(blog.id)}/>
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