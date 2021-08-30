<template>
  <button type="button" class="button" @click="onClick">
    <IconClose focusable="false" :opacity="iconOpacity" :fill="fill" />
    <span class="button__label">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconClose from 'src/components/icons/IconClose.vue'

export default defineComponent({
  name: 'ButtonClose',
  components: {
    IconClose,
  },
  props: {
    iconOpacity: String,
    fill: String,
  },
  emits: ['click-close'],
  setup(props, { emit }) {
    return {
      onClick() {
        emit('click-close')
      },
    }
  },
})
</script>

<style scoped lang="scss">
.button {
  border: 0;
  padding: 0;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  display: inline-flex;
  background: transparent;

  /* Screen-reader only styling for this label - it has more support than aria-label */
  &__label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
