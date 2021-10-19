<template>
  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="toggleDialog"
  >
    <template #title>
      <slot name="title">Interest-free Payment</slot>
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
        Terms & Conditions
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
    accordionData: {
      type: Object as () => TermProps,
      required: true,
    },
  },
  emits: ['toggle-dialog'],
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    selectProductType(): ProductEnum {
      const productType = this.tabsData[0].productType
      return productType
    },
    getDataForProduct(): TabItemProps[] | undefined {
      const productType = this.selectProductType()
      const productData = this.tabsData.find(
        product => product.productType === productType
      )
      return productData?.productItems
    },
    getTermsForProduct() {
      const productType = this.selectProductType()
      const productTypeLower = productType?.toLowerCase() as ProductEnum
      return this.accordionData[productTypeLower]
    },
    tabsContents(id: string): Partial<ContentsProps[]> | undefined {
      const productData = this.getDataForProduct()
      const allContents = productData?.find(item => item.id === id)?.contents
      if (allContents?.findIndex(item => item.key === 'productPrice') === -1) {
        allContents?.push({
          key: 'productPrice',
          name: 'Purchase Amount',
          value: Number(this.productPrice).toFixed(2),
        })
      }
      if (this.lang === LanguageCodeEnum.Australia) {
        const displayedContent = allContents?.filter(item =>
          [
            'interestFreePeriod',
            'establishmentFee',
            'productPrice',
            'indicativeMinMonthly',
            'indicativeMonthly',
          ].includes(item.key)
        )
        return displayedContent
      }
      if (this.lang === LanguageCodeEnum.NewZealand) {
        const displayedContent = allContents?.filter(item =>
          [
            'interestFreePeriod',
            'establishmentFee',
            'productPrice',
            'indicativeMinMonthly',
          ].includes(item.key)
        )
        return displayedContent
      }
    },
  },
})
</script>
