import { apiUrl } from './constants'

export const fetchData = async (
  input: RequestInfo,
  config?: RequestInit
): Promise<Response> => {
  const response = await (await fetch(apiUrl + input, config)).json()
  console.log(response)
  return response
}

export default fetchData
