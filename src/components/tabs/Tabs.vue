<template>
  <div class="tabs">
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

    <div class="tabs__item">
      <div
        v-for="tab in tabs"
        :id="tab.id"
        :key="tab.id"
        role="tabpanel"
        tabindex="0"
        :class="['tabs__content', { 'is-active': activeTabId === tab.id }]"
        :aria-labelledby="tab.id + '-tab'"
      >
        {{ tab.content }}
      </div>
    </div>
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
  emits: ['clickTab'],
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
    background: var(--color-4);
    border: none;
    border-top: 7px solid transparent;
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

  &__item {
    display: block;
    background: #fff;
  }

  &__content {
    padding: 11px;
    display: none;
    color: var(--color-0);
    font-family: var(--font-base);

    &.is-active {
      display: block;
    }
  }
}
</style>
