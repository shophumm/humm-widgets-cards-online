<template>
  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="toggleDialog"
  >
    <template #title>
      <slot name="title">
        <strong> {{ getOverlayTitle() }} </strong>
      </slot>
    </template>
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <Tabs :tabs="getPrimaryProductData()">
        <template #default="{ activeTabId }">
          <Tab
            v-for="tab in getPrimaryProductData()"
            :key="tab.id"
            :tab-id="tab.id"
            :active-tab-id="activeTabId"
          >
            <DataList :contents="tabsContents(tab.id)" />
          </Tab>
        </template>
      </Tabs>
      <slot name="footer" />
      <Accordion id="widget-terms" :content="accordionData">
        {{ accordionTitle }}
      </Accordion>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Accordion from 'src/components/accordion/Accordion.vue'
import Dialog from 'src/components/dialog/Dialog.vue'
import Tabs from 'src/components/tabs/Tabs.vue'
import Tab from 'src/components/tabs/Tab.vue'
import DataList from 'src/components/tabs/DataList.vue'
import { TabItemProps, ContentsProps, ProductItemProps } from 'src/models/Tabs'
import ProductEnum from 'src/models/enums/ProductEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import { productLanguage } from 'src/lang/ResponseLanguage'
import {
  getProductValueByKey,
  convertToCurrencyFormat,
  pluralize,
} from 'src/utils/utils'

export default defineComponent({
  name: 'DialogOverlay',
  components: {
    Accordion,
    Dialog,
    DataList,
    Tab,
    Tabs,
  },
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    buttonCloseLabel: {
      type: String,
    },
    lang: {
      type: String as () => LanguageCodeEnum,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productsData: {
      type: Array as () => ProductItemProps[],
      required: true,
    },
    accordionTitle: {
      type: String,
      default: 'Terms & Conditions',
    },
    accordionData: {
      type: String,
      required: true,
    },
  },
  emits: ['toggle-dialog'],
  data() {
    return {
      fieldBreakdownAu: [
        'interestFreePeriod',
        'productPrice',
        'establishmentFee',
        'indicativeMinMonthly',
        'indicativeMonthly',
      ],
      fieldBreakdownNz: [
        'interestFreePeriod',
        'productPrice',
        'establishmentFee',
        'indicativeMonthly',
      ],
    }
  },
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    getPrimaryProduct(): ProductItemProps {
      return this.productsData[0]
    },
    getPrimaryProductType(): ProductEnum {
      const productType = this.getPrimaryProduct().productType
      return productType
    },
    getPrimaryProductData(): TabItemProps[] {
      const productType = this.getPrimaryProductType()
      const productData = this.productsData.find(
        product => product.productType === productType
      )
      if (!productData)
        throw new Error(`No data found corresponding to ${productType}`)
      return productData.productItems
    },
    getOverlayTitle() {
      const productType = this.getPrimaryProductType()
      switch (productType) {
        case ProductEnum.LongTermInterestFree:
          return 'Long Term Finance Offer'
        case ProductEnum.PaymentHoliday: {
          const interestFreePeriod = getProductValueByKey(
            this.getPrimaryProduct(),
            'interestFreePeriod'
          )
          return `${interestFreePeriod} ${pluralize(
            interestFreePeriod as number,
            'Month'
          )} No Payments & No Interest`
        }
        default:
          return productType
      }
    },
    appendProductPrice(productContents: ContentsProps[]): ContentsProps[] {
      if (
        productContents.findIndex(item => item.key === 'productPrice') === -1
      ) {
        productContents.push({
          key: 'productPrice',
          name: 'Purchase Amount',
          value: this.productPrice,
        })
      }
      return productContents
    },
    filterContentByLang(content: ContentsProps[]): ContentsProps[] {
      let filteredContent = undefined
      switch (this.lang) {
        case LanguageCodeEnum.Australia:
          filteredContent = content.filter(item =>
            this.fieldBreakdownAu.includes(item.key)
          )
          if (!filteredContent)
            throw new Error(
              `No content that matches AU breakdown : ${this.fieldBreakdownAu}`
            )
          return filteredContent
        case LanguageCodeEnum.NewZealand:
          filteredContent = content.filter(item =>
            this.fieldBreakdownNz.includes(item.key)
          )
          if (!filteredContent)
            throw new Error(
              `No content that matches NZ breakdown : ${this.fieldBreakdownNz}`
            )
          return filteredContent
        default:
          return content
      }
    },
    orderContent(unorderedContent: ContentsProps[]): ContentsProps[] {
      switch (this.lang) {
        case LanguageCodeEnum.Australia: {
          const orderedContent = unorderedContent.sort(
            (a, b) =>
              this.fieldBreakdownAu.indexOf(a.key) -
              this.fieldBreakdownAu.indexOf(b.key)
          )
          return orderedContent
        }
        case LanguageCodeEnum.NewZealand: {
          const orderedContent = unorderedContent.sort(
            (a, b) =>
              this.fieldBreakdownNz.indexOf(a.key) -
              this.fieldBreakdownNz.indexOf(b.key)
          )
          return orderedContent
        }
        default:
          return unorderedContent
      }
    },
    appendUnits(content: ContentsProps[]): ContentsProps[] {
      const contentWithUnit = content.map(breakdownItem => {
        const nameLabelPair = productLanguage.find(
          item => item.name === breakdownItem.key
        )
        let valueWithUnit = ''
        if (nameLabelPair) {
          switch (nameLabelPair.unit.toLowerCase()) {
            case '$':
              valueWithUnit = convertToCurrencyFormat(breakdownItem.value)
              break
            case 'months': {
              const unit = `${pluralize(
                breakdownItem.value as number,
                'month'
              )}`
              valueWithUnit = `${breakdownItem.value} ${unit}`
              break
            }
            default:
              valueWithUnit = breakdownItem.value as string
          }
        }
        return {
          key: breakdownItem.key,
          name: breakdownItem.name,
          value: valueWithUnit,
        }
      })
      return contentWithUnit
    },
    tabsContents(id: string): ContentsProps[] {
      const productData = this.getPrimaryProductData()
      const productContents = productData?.find(item => item.id === id)
        ?.contents

      if (!productContents)
        throw new Error(`No content found corresponding to id ${id}`)

      const allContent = this.appendProductPrice(productContents)

      const filteredContent = this.filterContentByLang(allContent)

      const orderedContent = this.orderContent(filteredContent)

      return this.appendUnits(orderedContent)
    },
  },
})
</script>
