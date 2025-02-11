import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log("start create new blog with axios")
  const config = {
    headers: { authorization: token }
  }
  console.log(config)
  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async id => {
  console.log("delete blog with axios")
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, deleteBlog }