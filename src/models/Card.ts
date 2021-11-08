import type { Sizes } from 'src/models/enums/SizeEnum'

export interface CardProps {
  id: string
  alt: string
  src: string
  size?: Sizes
  interestRate: number
  annualFee: number
}

export default CardProps
