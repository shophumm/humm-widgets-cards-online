import { isDevelopment, merchantId } from 'src/utils/constants'
import ScriptParametersEnum from 'src/models/enums/ScriptParametersEnum'
import type ScriptParameters from 'src/models/ScriptParameters'
import { Product, Card } from 'src/models/Response'
import { ContentsProps, TabItemProps } from 'src/models/Tabs'
import CardProps from 'src/models/Card'
import { ProductLanguage } from 'src/lang/ResponseLanguage'

export const getCurrentScript = (): HTMLOrSVGScriptElement =>
  document.currentScript ||
  (function () {
    const scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  })()

// Get all parameters set on the script URL to pass a set restricted to ScriptParametersEnum in as initial properties
// No IE 11 support for URLSearchParams or Object.fromEntries
// Do not get script parameters in development, as this doesn't work with the auto-injected script tag
export const getAllScriptURLParameters = (
  scriptEl: HTMLOrSVGScriptElement
): ScriptParameters => {
  if (isDevelopment) {
    return {
      productPrice: 56,
      merchantId,
    }
  }

  const scriptString = scriptEl.getAttribute('src') || ''
  const paramsString = scriptString.split('?').pop()
  const paramsUrl = new URLSearchParams(paramsString)
  const paramsRaw = Object.fromEntries(paramsUrl)
  const paramsKeysAllowed = Object.values<string | ScriptParametersEnum>(
    ScriptParametersEnum
  )

  // Filter allowed script URL parameters to values in ScriptParametersEnum which are keys on ScriptParameters
  // Do some basic sanitizing of string values
  const params = Object.keys(paramsRaw)
    .filter(key => paramsKeysAllowed.includes(key))
    .reduce<ScriptParameters>((obj, key) => {
      const cleanString = paramsRaw[key].replace(/[^.a-z0-9]/gi, '')
      const cleanParams: ScriptParameters = {
        ...obj,
        [key]: cleanString,
      }

      return cleanParams
    }, {} as ScriptParameters)

  return params
}

export const getTabsData = (productsData: Product[]): TabItemProps[] => {
  const tabs = productsData.map(product => ({
    id: product.id,
    label: product.type,
    contents: getProductContent(product),
  }))
  return tabs
}

export const getProductContent = (productData: Product): ContentsProps[] => {
  const contents = Object.entries(productData).map(item => {
    const [langKey, langValue] = item
    return {
      name: getProductLabel(langKey),
      value: langValue,
    }
  })
  return contents
}

export const getProductLabel = (nameKey: string): string => {
  const nameLabelPair = ProductLanguage.find(item => item.name === nameKey)
  return nameLabelPair ? nameLabelPair.label : nameKey
}

export const getCardsData = (cardsData: Card[]): CardProps[] => {
  const cards = cardsData.map(card => ({
    id: card.id,
    alt: card.name,
    src: card.image,
  }))
  return cards
}
