import { apiUrl } from './constants'

export const fetchData = async (
  endpoint: string,
  config?: RequestInit
): Promise<Response | undefined> => {
  try {
    const request = await fetch(`${apiUrl}/${endpoint}`, config)
    const response = request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export default fetchData
