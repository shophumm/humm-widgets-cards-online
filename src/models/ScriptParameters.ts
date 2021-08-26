export enum ScriptParametersEnum {
  ProductPrice = 'productPrice',
  MerchantId = 'merchantId',
}

export interface ScriptParameters {
  [ScriptParametersEnum.ProductPrice]: number
  [ScriptParametersEnum.MerchantId]: string
}

export default ScriptParameters
