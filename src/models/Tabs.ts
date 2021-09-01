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
  id: string
  defaultTabId?: string
  tabs: TabItemProps[]
}

export default TabsProps
