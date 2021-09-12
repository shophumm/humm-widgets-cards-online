<template>
  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="toggleDialog"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <Tabs :tabs="tabsData">
        <template #default="{ activeTabId }">
          <Tab tab-id="12months" :active-tab-id="activeTabId">
            <DataList :contents="tabsContents('12months')" />
          </Tab>
          <Tab tab-id="18months" :active-tab-id="activeTabId">
            <DataList :contents="tabsContents('18months')" />
          </Tab>
        </template>
      </Tabs>
      <Accordion id="widget-terms" :content="accordianData">
        Terms & Conditions
      </Accordion>
      <slot name="footer" />
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
      type: Array as () => TabItemProps[],
      required: true,
    },
    accordianData: {
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
