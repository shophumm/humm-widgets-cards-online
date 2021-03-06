<template>
  <div class="tabs">
    <ul v-if="tabs.length > 1" class="tabs__controls" role="tablist">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="tabs__control"
        role="presentation"
      >
        <button
          :id="tab.id + '-tab'"
          type="button"
          role="tab"
          :class="['tabs__button', { 'is-active': activeTabId === tab.id }]"
          :aria-controls="tab.id"
          :aria-selected="activeTabId === tab.id"
          @click="changeTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <slot :activeTabId="activeTabId" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { TabItemProps } from 'src/models/Tabs'

export default defineComponent({
  name: 'Tabs',
  props: {
    defaultTabId: String,
    tabs: {
      type: Array as () => TabItemProps[],
      required: true,
      validator: (tabs: unknown[]) => !!tabs.length,
    },
  },
  data() {
    return {
      activeTabId: this.defaultTabId || this.tabs?.[0]?.id,
    }
  },
  methods: {
    changeTab(tabId: string) {
      this.activeTabId = tabId
    },
  },
})
</script>

<style scoped lang="scss">
.tabs {
  display: block;
  width: 100%;

  &__controls {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
  }

  &__control {
    flex-grow: 1;
  }

  &__button {
    width: 100%;
    background: var(--color-5);
    border: none;
    border-top: 4px solid transparent;
    padding: 4px 0;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    cursor: pointer;
    color: var(--color-0);
    font-weight: bold;
    text-align: center;
    min-height: 36px;
    font-family: var(--font-base);
    font-size: 14px;

    &.is-active {
      border-top-color: var(--color-2);
      background: var(--color-6);
    }
  }
}
</style>
