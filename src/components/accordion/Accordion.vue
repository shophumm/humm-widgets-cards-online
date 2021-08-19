<template>
  <div :class="classes" :style="style">
    <button
      type="button"
      class="accordion__button"
      @clickAccordion="onClick"
      v-on:click="toggleOpen"
      :aria-expanded="isOpen"
      :aria-controls="id + '-collapse'"
      :id="id + '-header'"
    >
      <span class="accordion__label">
        <slot></slot>
      </span>
      <span :class="['accordion__icon', { 'is-open': isOpen }]">
        <IconChevron fill="currentColor" />
      </span>
    </button>

    <div
      v-if="isOpen"
      :id="id + '-collapse'"
      :aria-labelledby="id + '-header'"
      class="accordion__collapse"
    >
      <div class="accordion__body">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconChevron from 'src/components/icons/IconChevron.vue'
import type AccordionProps from 'src/models/Accordion'

export default defineComponent({
  name: 'Accordion',
  components: {
    IconChevron,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    content: String,
    isDefaultOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.isDefaultOpen,
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
  },
  emits: ['click-accordion'],
  setup(props: AccordionProps, { emit }) {
    return {
      onClick() {
        emit('click-accordion')
      },
    }
  },
})
</script>

<style scoped lang="scss">
.accordion {
  &__button {
    font-family: var(--font-base);
    font-weight: 700;
    font-size: 9px;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    background: transparent;
  }

  &__icon {
    margin-left: 5px;

    svg {
      transform: rotate(0);
      transition: transform 0.5s;
    }

    &.is-open svg {
      transform: rotate(180deg);
    }
  }

  &__collapse {
    margin-top: 8px;
    font-size: 9px;
  }

  &__body {
    font-family: var(--font-base);
    line-height: 1.2;
  }
}
</style>
