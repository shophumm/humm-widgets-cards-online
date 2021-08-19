export interface TabItemProps {
  label: string
  id: string
  content: string
}

export interface TabsProps {
  id: string
  defaultTabId?: string
  tabs: TabItemProps[]
}

export default TabsProps
