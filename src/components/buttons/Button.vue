<template>
  <a
    v-if="href"
    :href="href"
    :class="[
      'button',
      {
        'button--primary': primary,
        'button--bold': isBold,
        'button--rounded': isRounded,
        [`button--${size}`]: size,
      },
    ]"
    :style="style"
    @click="onClick"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    :class="[
      'button',
      {
        'button--primary': primary,
        'button--bold': isBold,
        'button--rounded': isRounded,
        [`button--${size}`]: size,
      },
    ]"
    :style="style"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SizeEnum from 'src/models/enums/SizeEnum'
import type { PropType } from 'vue'
import type { Sizes } from 'src/models/enums/SizeEnum'

export default defineComponent({
  name: 'Button',
  props: {
    buttonColor: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<Sizes>,
      default: SizeEnum.Auto,
    },
    href: String,
    primary: Boolean,
    isBold: Boolean,
    isRounded: Boolean,
  },
  emits: ['click'],
  computed: {
    style(): string {
      return 'color: ' + this.buttonColor
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
})
</script>

<style scoped lang="scss">
.button {
  font-family: var(--font-base);
  font-weight: 700;
  background: transparent;
  border: 1px solid currentColor;
  padding: 2px 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  appearance: none;
  font-size: 13px;
  border-radius: var(--radius-1);
  justify-content: center;

  &--auto {
    min-height: 35px;
    letter-spacing: -0.01em;
    font-size: 12px;
    font-weight: 500;
    width: auto;
    min-width: 90px;
    min-height: 20px;
  }

  &--sm {
    font-size: 12px;
    font-weight: 500;
    width: auto;
    min-width: 20px;
    min-height: 20px;
  }

  &--md {
    font-size: 14px;
    min-height: 20px;
    padding: 5px 15px;
  }

  &--lg {
    font-size: 13px;
    font-weight: 700;
    min-height: 35px;
    width: 100%;
    max-width: 138px;
  }

  &--primary {
    background: var(--color-1);
    color: var(--color-1-contrast);
    border-color: var(--color-1);
  }

  &[href] {
    text-decoration: none;
    color: inherit;
  }

  &--rounded {
    border-radius: 10em;
  }

  &--bold {
    font-weight: 700;
  }
}
</style>
