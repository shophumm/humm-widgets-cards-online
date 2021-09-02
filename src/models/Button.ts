import type { Sizes } from 'src/models/enums/SizeEnum'

export interface ButtonProps {
  buttonColor: string
  primary?: boolean
  size?: Sizes
  href?: string
}

export default ButtonProps
