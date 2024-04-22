import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      console.log("new token set")
      console.log(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)

    } catch (exception) {
    }

  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    console.log("logged out")
  }

  const handleSubmit = async () => {
      console.log("Trying to send new blog")
      const blog =  {
        "author": author,
        "url": url,
        "title": title
      }

      const response = await blogService.create(blog)
      console.log("new blog sent", response)
  }

  if (user === null) {
    return (
      <div>
      <h2>Login</h2>
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
    </div>
    )
  }

  

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <h3>User: {user.name}</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <form onSubmit={handleLogOut}>
      <div>
        <button type="submit">logout</button>
      </div>
      </form>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}


export default App