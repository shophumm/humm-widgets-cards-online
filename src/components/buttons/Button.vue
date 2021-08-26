<template>
  <button
    type="button"
    :class="['button', { 'button--primary': primary }]"
    @click="onClick"
    :style="style"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { reactive, computed, defineComponent } from 'vue'
import { ButtonProps } from 'src/models/Button'

export default defineComponent({
  name: 'Button',
  props: {
    buttonColor: {
      type: String,
      required: true,
    },
    primary: Boolean,
  },
  emits: ['click'],
  setup(props: ButtonProps, { emit }) {
    props = reactive(props)
    return {
      style: computed(() => ({
        color: props.buttonColor,
      })),
      onClick() {
        emit('click')
      },
    }
  },
})
</script>

<style scoped lang="scss">
.button {
  font-family: var(--font-base);
  font-weight: 700;
  background: transparent;
  border: 1px solid currentColor;
  padding: 5px 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  line-height: 0.85;
  text-transform: uppercase;
  appearance: none;
  font-size: 13px;
  border-radius: 4px;
  min-width: 138px;
  min-height: 35px;
  justify-content: center;
  margin-top: 5px;
  @media (min-width: 430px) {
    margin-top: 0;
    font-size: 11px;
    font-weight: 500;
    min-width: 20px;
    min-height: 20px;
  }

  &--primary {
    background: var(--color-1);
    color: var(--color-1-contrast);
    border-color: var(--color-1);
  }
}
</style>
