<template>
  <div class="tabs">
    <ul class="tabs__controls" :id="id" role="tablist">
      <li
        class="tabs__control"
        v-for="tab in tabs"
        v-bind:key="tab.id"
        role="presentation"
      >
        <button
          :class="['tabs__button', { 'is-active': activeTabId === tab.id }]"
          :id="tab.id + '-tab'"
          type="button"
          role="tab"
          :aria-controls="tab.id"
          v-on:click="changeTab(tab.id)"
          aria-selected="true"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <div class="tabs__item" :id="id">
      <div
        :class="['tabs__content', { 'is-active': activeTabId === tab.id }]"
        v-for="tab in tabs"
        v-bind:key="tab.id"
        :id="tab.id"
        :aria-labelledby="tab.id + '-tab'"
        role="tabpanel"
        tabindex="0"
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
  data() {
    return {
      activeTabId: this.defaultTabId || this.tabs[0].id,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    defaultTabId: String,
    tabs: {
      type: Array as () => TabItemProps[],
      required: true,
      default: () => [],
    },
  },
  methods: {
    changeTab(tabId: string) {
      this.activeTabId = tabId
    },
  },
  emits: ['clickTab'],
})
</script>

<style scoped lang="scss">
.tabs {
  display: block;
  width: 100%;
  max-width: 300px;

  &__controls {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
  }
  &__control {
    flex-grow: 1;
    margin: 0 4px;

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
    border-top: 7px solid transparent;
    padding: 4px 0;
    border-top-left-radius: var(--radius-1);
    border-top-right-radius: var(--radius-1);
    cursor: pointer;
    color: var(--color-1);
    font-weight: bold;
    text-align: center;
    min-height: 23px;

    &.is-active {
      border-top-color: var(--color-2);
      background: var(--color-1-contrast);
    }
  }
  &__item {
    display: block;
    background: #fff;
  }
  &__content {
    padding: 11px;
    display: none;
    color: var(--color-1);
    font-family: var(--font-base);

    &.is-active {
      display: block;
    }
  }
}
</style>
