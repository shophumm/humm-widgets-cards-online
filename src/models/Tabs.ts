export interface ContentsProps {
  name: string
  value: string
}
export interface TabItemProps {
  label: string
  id: string
  contents: ContentsProps[]
}

export interface ProductItemProps {
  productType: string
  productItems: TabItemProps[]
}

export interface TabsProps {
  defaultTabId?: string
  tabs: ProductItemProps[]
}

export default TabsProps
