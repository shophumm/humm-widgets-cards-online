import type { Sizes } from 'src/models/enums/SizeEnum'

export interface CardProps {
  id: string
  size: Sizes
  alt: string
}

export default CardProps
