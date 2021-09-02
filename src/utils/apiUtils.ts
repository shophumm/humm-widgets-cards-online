import { apiUrl } from './constants'

export const fetchData = async (
  input: RequestInfo,
  config?: RequestInit
): Promise<Response> => {
  const postConfig = { ...config, method: 'POST' }
  const response = await (await fetch(apiUrl + input, postConfig)).json()
  console.log(response)
  return response
}

export default fetchData
