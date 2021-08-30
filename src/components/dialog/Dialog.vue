<template>
  <Transition name="dialog">
    <div class="dialog__mask">
      <div class="dialog__wrapper">
        <div class="dialog__container">
          <div class="dialog__header">
            <slot name="header">Monthly payments</slot>
            <ButtonClose
              @click="toggleDialog"
              iconOpacity="0.5"
              fill="var(--color-3)"
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
    max-width: 331px;
    margin: 0px auto;
    padding: 6px 12px;
    background-color: #f7f7f7;
    border-radius: var(--radius-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--color-0);
    @media (min-width: 560px) {
      max-width: 536px;
    }
  }

  &__header {
    margin-top: 12px;
    font-size: 16px;
    font-weight: 700;
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
