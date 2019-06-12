import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log('getAll response:', response)
  return response.data
}

export default { getAll }