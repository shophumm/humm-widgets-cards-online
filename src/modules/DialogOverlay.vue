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
      <Tabs :tabs="getPrimaryProductData(tabsData)">
        <template #default="{ activeTabId }">
          <Tab
            v-for="tab in getPrimaryProductData(tabsData)"
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
    tabsData: {
      type: Array as () => ProductItemProps[],
      required: true,
    },
    accordionData: {
      type: String,
      required: true,
    },
  },
  emits: ['toggle-dialog'],
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    getPrimaryProductData(data: ProductItemProps[]): TabItemProps[] {
      return data[0].productItems
    },
    tabsContents(id: string): ContentsProps[] | undefined {
      const productData = this.getPrimaryProductData(this.tabsData)
      return productData.find(item => item.id === id)?.contents
    },
  },
})
</script>
