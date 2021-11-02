export interface Card {
  id: string
  image: string
  name: string
  interestRate: number
  annualFee: number
}

export interface Product {
  id: string
  type: string
  interestFreePeriod: number
  termPeriod: number
  interestRate: number
  paymentHolidayPeriod: number
  establishmentFee: number
  advancedFee: number
  description: string
  minPurchasePrice: number
  endDate: string
  indicativeMinMonthly: number
  indicativeMonthly: number
}

export interface Terms {
  standard?: string
  'payment-holiday'?: string
}

export interface WidgetResponseBody {
  products: Product[]
  cards: Card[]
  terms: Terms[]
}

export default WidgetResponseBody
