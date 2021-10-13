export interface Card {
  id: string
  image: string
  name: string
}

export interface Product {
  id: string
  type: string
  interestFreePeriod: number
  termPeriod: number
  termRate: number
  deferredPeriod: number
  establishmentFee: number
  description: string
  interestFreeMonthlyRepayment: number
  minTermMonthlyRepayment: number
  remainderInterestPeriodMontlyRepayment: number
}

export interface Terms {
  standard?: string
  hybrid?: string
  fixed?: string
}

export interface WidgetResponseBody {
  products: Product[]
  cards: Card[]
  terms: string
}

export default WidgetResponseBody
