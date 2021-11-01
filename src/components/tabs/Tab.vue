<template>
  <div :class="['tab', { 'is-active': activeTabId === tabId }]">
    <div class="tab__content">
      <slot />
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
  background: var(--color-6);

  &.is-active {
    display: block;
    height: auto;
    border-bottom-left-radius: var(--radius-3);
    border-bottom-right-radius: var(--radius-3);
  }

  &__content {
    padding: 11px;
    display: block;
    color: var(--color-0);
    font-family: var(--font-base);
  }
}
</style>
