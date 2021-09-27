import WidgetResponseBody from 'src/models/Response'
import { apiUrl } from './constants'

export const fetchData = async <T>(
  endpoint: string,
  config: RequestInit
): Promise<T | undefined> => {
  const url = `${apiUrl}/${endpoint}`
  try {
    const request = await fetch(url, config)

    if (!request.ok) {
      throw new Error(request.statusText)
    }

    const response = request.json()
    return response
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        `Could not get a response from ${url}\n More details: ${error.toString()}`
      )
  }
}

export const fetchWidgetData = async (
  merchantId?: string,
  productPrice?: number
): Promise<WidgetResponseBody | undefined> => {
  const requestBody = { merchantId: merchantId, price: productPrice }
  const response = await fetchData<WidgetResponseBody>('widget', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })
  if (response) return response
}

export default fetchData
