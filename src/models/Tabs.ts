export interface TabItemProps {
  label: string
  id: string
  content: {
    interestFree: string
    purchaseAmount: string
    estFee: string
    minimumMonthlyPayment: string
    repayBeforeInterest: string
  }
}

export interface TabsProps {
  id: string
  defaultTabId?: string
  tabs: TabItemProps[]
}

export default TabsProps
