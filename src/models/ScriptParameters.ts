export enum ScriptParametersEnum {
  ProductPrice = 'productPrice',
  MerchantId = 'merchantId',
}

type ScriptParametersEnumKeys = `${ScriptParametersEnum}`
type ScriptParameters = {
  [key in ScriptParametersEnumKeys]: string | number
}

export default ScriptParameters
