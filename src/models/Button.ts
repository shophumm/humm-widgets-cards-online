import type { Sizes } from 'src/models/enums/SizeEnum'

export interface ButtonProps {
  buttonColor: string
  primary?: boolean
  size?: Sizes
}

export default ButtonProps
