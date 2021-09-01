<template>
  <div :class="['tab', { 'is-active': activeTabId === tabId }]">
    <div class="tab__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    activeTabId: String,
    tabId: String,
  },
})
</script>

<style scoped lang="scss">
.tab {
  display: none;
  background: #fff;

  &.is-active {
    display: block;
  }

  &__content {
    padding: 11px;
    display: block;
    color: var(--color-0);
    font-family: var(--font-base);
  }
}
</style>
