import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
  console.log('getAll response:', response)
  return response.data;
}

const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request;
  console.log('getOne response:', response)
  return response.data;
}

const create = async (blog) => {
  const request = axios.post(baseUrl, blog)
  const response = await request;
  //console.log('create response:', response)
  return response.data;
}

const update = async (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  const response = await request;
  console.log('update response:', response)
  return response.data;
}

export default { getAll, getOne, create, update }