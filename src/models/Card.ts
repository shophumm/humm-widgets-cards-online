import type { Sizes } from 'src/models/enums/SizeEnum'

export interface CardProps {
  id: string
  alt: string
  src: string
  size?: Sizes
}

export default CardProps
