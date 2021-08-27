<template>
  <Transition name="dialog">
    <div class="dialog__mask">
      <div class="dialog__wrapper">
        <div class="dialog__container">
          <div class="dialog__header">
            <slot name="header">Monthly payments</slot>
            <ButtonClose
              icon-opacity="0.5"
              fill="var(--color-3)"
              @click="toggleDialog"
            >
              {{ buttonCloseLabel }}
            </ButtonClose>
          </div>

          <div class="dialog__body">
            <slot name="body">Default body content</slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, Transition } from 'vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'

export default defineComponent({
  name: 'Dialog',
  components: {
    Transition,
    ButtonClose,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    buttonCloseLabel: {
      type: String,
      default: 'Close',
    },
  },
  emits: ['toggle-dialog'],
  setup(props, { emit }) {
    return {
      toggleDialog() {
        emit('toggle-dialog')
      },
    }
  },
})
</script>

<style scoped lang="scss">
.dialog {
  font-family: var(--font-base);

  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 6px 12px;
    background-color: #f7f7f7;
    border-radius: var(--radius-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: var(--font-secondary);
  }

  &__header {
    margin-top: 0;
    font-family: var(--font-base);
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    margin: 20px 0;
  }
}
</style>
