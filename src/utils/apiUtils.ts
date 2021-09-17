import WidgetResponseBody from 'src/models/Response'
import { apiUrl } from './constants'

export const fetchData = async <T>(
  endpoint: string,
  config?: RequestInit
): Promise<T | undefined> => {
  try {
    const request = await fetch(`${apiUrl}/${endpoint}`, config)
    const response = request.json()
    return response
  } catch (err) {
    console.log(err)
  }
}

export const fetchWidgetData = async (): Promise<
  WidgetResponseBody | undefined
> => {
  const response = await fetchData<WidgetResponseBody>('widget', {
    method: 'POST',
  })
  if (response) return response
}

export default fetchData
