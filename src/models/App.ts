import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'

export interface AppProps {
  lang: LanguageCodeEnum
  productPrice: number
  theme?: ThemeEnum
}

export default AppProps
