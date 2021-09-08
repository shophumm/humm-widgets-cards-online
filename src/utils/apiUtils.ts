import { apiUrl } from './constants'

export const fetchData = async (
  endpoint: string,
  config?: RequestInit
): Promise<Response> => {
  const request = await fetch(`${apiUrl}/${endpoint}`, config)
  const response = request.json()
  return response
}

export default fetchData
