<template>
  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="toggleDialog"
  >
    <template #title>
      <slot name="title"><strong>Interest-free Payment</strong></slot>
    </template>
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <Tabs :tabs="getDataForProduct()">
        <template #default="{ activeTabId }">
          <Tab
            v-for="tab in getDataForProduct()"
            :key="tab.id"
            :tab-id="tab.id"
            :active-tab-id="activeTabId"
          >
            <DataList :contents="tabsContents(tab.id)" />
          </Tab>
        </template>
      </Tabs>
      <slot name="footer" />
      <Accordion id="widget-terms" :content="getTermsForProduct()">
        {{ accordianTitle }}
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
import { TermProps } from 'src/models/Terms'
import ProductEnum from 'src/models/enums/ProductEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'

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
    tabsData: {
      type: Array as () => ProductItemProps[],
      required: true,
    },
    accordianTitle: {
      type: String,
      default: 'Terms & Conditions',
    },
    accordionData: {
      type: Object as () => TermProps,
      required: true,
    },
  },
  emits: ['toggle-dialog'],
  data() {
    return {
      fieldBreakdownAu: [
        'interestFreePeriod',
        'establishmentFee',
        'productPrice',
        'indicativeMinMonthly',
        'indicativeMonthly',
      ],
      fieldBreakdownNz: [
        'interestFreePeriod',
        'establishmentFee',
        'productPrice',
        'indicativeMonthly',
      ],
    }
  },
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    selectProductType(): ProductEnum {
      const productType = this.tabsData[0].productType
      return productType
    },
    getDataForProduct(): TabItemProps[] {
      const productType = this.selectProductType()
      const productData = this.tabsData.find(
        product => product.productType === productType
      )
      if (!productData)
        throw new Error(`No data found corresponding to ${productType}`)
      return productData.productItems
    },
    getTermsForProduct() {
      const productType = this.selectProductType()
      const productTypeLower = productType?.toLowerCase() as ProductEnum
      return this.accordionData[productTypeLower]
    },
    appendProductPrice(productContents: ContentsProps[]): ContentsProps[] {
      if (
        productContents.findIndex(item => item.key === 'productPrice') === -1
      ) {
        productContents.push({
          key: 'productPrice',
          name: 'Purchase Amount',
          value: `$${parseFloat(`${this.productPrice}`).toFixed(2)}`,
        })
      }
      return productContents
    },
    filterContentByLang(content: ContentsProps[]): ContentsProps[] {
      let displayedContent = undefined
      switch (this.lang) {
        case LanguageCodeEnum.Australia:
          displayedContent = content.filter(item =>
            this.fieldBreakdownAu.includes(item.key)
          )
          if (!displayedContent)
            throw new Error(
              `No content that matches AU breakdown : ${this.fieldBreakdownAu}`
            )
          return displayedContent
        case LanguageCodeEnum.NewZealand:
          displayedContent = content.filter(item =>
            this.fieldBreakdownNz.includes(item.key)
          )
          if (!displayedContent)
            throw new Error(
              `No content that matches NZ breakdown : ${this.fieldBreakdownNz}`
            )
          return displayedContent
        default:
          return content
      }
    },
    orderContent(unorderedContent: ContentsProps[]): ContentsProps[] {
      switch (this.lang) {
        case LanguageCodeEnum.Australia:
          return unorderedContent.sort(
            (a, b) =>
              this.fieldBreakdownAu.indexOf(a.key) -
              this.fieldBreakdownAu.indexOf(b.key)
          )
        case LanguageCodeEnum.NewZealand:
          return unorderedContent.sort(
            (a, b) =>
              this.fieldBreakdownNz.indexOf(a.key) -
              this.fieldBreakdownNz.indexOf(b.key)
          )
        default:
          return unorderedContent
      }
    },
    tabsContents(id: string): ContentsProps[] {
      const productData = this.getDataForProduct()
      const productContents = productData?.find(item => item.id === id)
        ?.contents

      if (!productContents)
        throw new Error(`No content found corresponding to id ${id}`)

      const allContent = this.appendProductPrice(productContents)

      const displayedContent = this.filterContentByLang(allContent)

      return this.orderContent(displayedContent)
    },
  },
})
</script>
