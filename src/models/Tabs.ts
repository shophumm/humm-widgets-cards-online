import ProductEnum from 'src/models/enums/ProductEnum'

export interface ContentsProps {
  key: string
  name: string
  value: string | number
}
export interface TabItemProps {
  label: string
  id: string
  contents: ContentsProps[]
}

export interface ProductItemProps {
  productType: ProductEnum
  productItems: TabItemProps[]
}

export interface TabsProps {
  defaultTabId?: string
  tabs: ProductItemProps[]
}

export default TabsProps
