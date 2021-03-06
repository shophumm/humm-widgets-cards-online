<template>
  <Transition name="dialog">
    <div ref="dialogMask" class="dialog__mask" @click="handleMaskClick">
      <div class="dialog__wrapper">
        <div
          role="dialog"
          aria-modal="true"
          :aria-labelledby="id + '-label'"
          class="dialog__container"
        >
          <div class="dialog__title">
            <div :id="id + '-label'" ref="dialogTitle" tabindex="-1">
              <slot name="title" />
            </div>
            <ButtonClose
              icon-opacity="0.8"
              fill="var(--color-4)"
              @click="toggleDialog"
            >
              {{ buttonCloseLabel }}
            </ButtonClose>
          </div>

          <div class="dialog__header">
            <slot name="header" />
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
    id: {
      type: String,
      required: true,
    },
    buttonCloseLabel: {
      type: String,
      default: 'Close',
    },
  },
  emits: ['toggle-dialog'],
  mounted() {
    this.$nextTick(() => {
      // Focus on the first element when mounting as a11y best practice
      const element = this.$refs.dialogTitle as HTMLDivElement | undefined
      element?.focus()

      // Allow closing the dialog with esc
      document.addEventListener('keydown', this.handleKeyboardToggle)

      // Add a focus trap within the dialog as a best practice
      document.addEventListener('keydown', this.handleFocusTrap)
    })
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardToggle)
    document.removeEventListener('keydown', this.handleFocusTrap)
  },
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    handleFocusTrap(event: KeyboardEvent) {
      if (event.key !== 'Tab') return

      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const element = this.$refs.dialogMask as HTMLDivElement | undefined
      const focusableElements = element?.querySelectorAll(focusableSelectors)
      const firstFocusableElement = focusableElements?.[0] as HTMLElement | null
      const lastFocusableElement = focusableElements?.[
        focusableElements.length - 1
      ] as HTMLElement | null

      // if tabbing back, tab+shift
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        lastFocusableElement?.focus()
        event.preventDefault()
      }

      // if tabbing forwards, tab
      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement?.focus()
        event.preventDefault()
      }
    },
    handleKeyboardToggle(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      this.toggleDialog()
    },
    handleMaskClick(event: Event) {
      const element = this.$refs.dialogMask as HTMLDivElement | undefined
      const target = event.target as HTMLElement | null

      // Toggle the dialog if clicking exactly on the mask
      if (target === element) {
        this.toggleDialog()
      }
    },
  },
})
</script>

<style scoped lang="scss">
.dialog {
  font-family: var(--font-base);

  &__mask {
    position: fixed;
    z-index: 2147483647;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    transition: opacity 0.3s ease;
    overflow: auto;
  }

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
    padding: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }

  &__container {
    width: 100%;
    max-width: 331px;
    margin: 0 auto;
    padding: 18px 20px;
    background-color: var(--bg-2);
    border-radius: var(--radius-3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: var(--font-base);
    pointer-events: all;
    color: var(--color-0);

    @media (min-width: 560px) {
      max-width: 536px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header {
    width: 100%;
    display: block;

    &:not(:empty) {
      margin-top: 20px;
    }
  }

  &__body {
    margin: 20px 0 0;
  }
}
</style>
