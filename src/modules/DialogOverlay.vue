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
      <MastercardExisting />
    </template>
    <template #body>
      <Tabs :tabs="tabsData">
        <template #default="{ activeTabId }">
          <Tab
            v-for="tab in tabsData"
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
import { TabItemProps, ContentsProps } from 'src/models/Tabs'
import MastercardExisting from 'src/modules/MastercardExisting.vue'

export default defineComponent({
  name: 'DialogOverlay',
  components: {
    Accordion,
    Dialog,
    DataList,
    Tab,
    Tabs,
    MastercardExisting,
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
      type: Array as () => TabItemProps[],
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
    tabsContents(id: string): ContentsProps[] | undefined {
      return this.tabsData.find(item => item.id === id)?.contents
    },
  },
})
</script>
