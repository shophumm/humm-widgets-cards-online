import CountryEnum from 'cypress/models/enum/CountryEnum'
import ThemeEnum from 'cypress/models/enum/ThemeEnum'

export interface VisitAndInjectWidgetProps {
  url: string
  targetElement: string
  position?: string
  country?: CountryEnum
  theme?: ThemeEnum
  darkMode?: boolean
}

export default VisitAndInjectWidgetProps
