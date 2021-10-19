import ProductLanguageProps from 'src/models/ProductLanguage'

export const productLanguage: ProductLanguageProps[] = [
  { name: 'interestFreePeriod', label: 'Interest free period', unit: 'months' },
  { name: 'establishmentFee', label: 'Establishment fee', unit: '$' },
  {
    name: 'indicativeMinMonthly',
    label: 'Indicative minimum monthly repayments*',
    unit: '$',
  },
  {
    name: 'indicativeMonthly',
    label: 'Indicative repayment to pay before Interest free period expires ^',
    unit: '$',
  },
]
