import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL
        })
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>
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
        </div>
    )
}
export default BlogForm