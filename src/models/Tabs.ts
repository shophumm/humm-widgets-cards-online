export interface ContentsProps {
  name: string
  value: string
}
export interface TabItemProps {
  label: string
  id: string
  contents: ContentsProps[]
}

export interface TabsProps {
  defaultTabId?: string
  tabs: TabItemProps[]
}

export default TabsProps
