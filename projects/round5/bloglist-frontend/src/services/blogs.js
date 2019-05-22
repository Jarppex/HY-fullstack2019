import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
  //console.log(response)
  return response.data;
}

const create = async (blog) => {
  //console.log('Lähetettävän blogin tiedot:', blog)
  //console.log('Lähetettävä tokeni:', blog.token)
  const request = axios.post(baseUrl, blog)
  const response = await request;
  //console.log(response)
  return response.data;
}

export default { getAll, create }