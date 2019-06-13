import axios from 'axios'
const baseUrl = '/api/comments'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log('comments "getAll" response:', response)
  return response.data
}

const create = async (comment) => {
  const request = axios.post(baseUrl, comment)
  const response = await request
  console.log('comments "create" response:', response)
  return response.data
}

export default { getAll, create }