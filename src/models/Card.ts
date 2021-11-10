import type { Sizes } from 'src/models/enums/SizeEnum'

export interface CardProps {
  id: string
  name: string
  src: string
  size?: Sizes
  interestRate: number
  annualFee: number
}

export default CardProps
