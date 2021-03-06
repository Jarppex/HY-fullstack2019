import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log('blogs "getAll" response:', response)
  return response.data
}

const getOne = async (blog) => {
  const request = axios.get(`${baseUrl}/${blog.id}`)
  const response = await request
  console.log('blogs "getOne" response:', response)
  return response.data
}

const create = async (blog) => {
  const request = axios.post(baseUrl, blog)
  const response = await request
  console.log('blogs "create" response:', response)
  return response.data
}

const update = async (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  const response = await request
  console.log('blogs "update" response:', response)
  return response.data
}

const remove = async (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`)
  const response = await request
  console.log('blogs "remove" response:', response)
  return response.data
}

export default { getAll, getOne, create, update, remove }