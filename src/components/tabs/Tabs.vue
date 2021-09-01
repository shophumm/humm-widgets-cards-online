<template>
  <div class="tabs" :data-activeTabId="activeTabId">
    <ul class="tabs__controls" role="tablist">
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
    <slot :activeTabId="activeTabId"></slot>
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
      activeTabId: this.defaultTabId,
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

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__button {
    width: 100%;
    background: #8c8c8c;
    border: none;
    border-top: 4px solid transparent;
    padding: 4px 0;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    cursor: pointer;
    color: var(--color-0);
    font-weight: bold;
    text-align: center;
    min-height: 23px;

    &.is-active {
      border-top-color: var(--color-2);
      background: #fff;
    }
  }
}

dl {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;

    dt {
      display: flex;
      align-items: center;
    }

    dd {
      display: flex;
      align-items: center;
    }
  }
}
</style>
