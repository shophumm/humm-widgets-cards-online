<template>
  <div class="accordion">
    <button
      :id="id + '-header'"
      type="button"
      class="accordion__button"
      :aria-expanded="isOpen"
      :aria-controls="id + '-collapse'"
      @click="toggleOpen"
    >
      <span class="accordion__label">
        {{ title }}
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
      <div class="accordion__footer">
        <a href="#terms">FIND OUT MORE</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconChevron from 'src/components/icons/IconChevron.vue'

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
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
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
})
</script>

<style scoped lang="scss">
.accordion {
  margin: 26px 0px 20px 0px;

  &__button {
    font-family: var(--font-base);
    font-size: 12px;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    background: transparent;
    color: var(--color-0);
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
    margin-top: 17px;
  }

  &__body {
    font-family: var(--font-base);
    font-size: 12px;
    line-height: 1.6;
    letter-spacing: 0.02em;
  }

  &__footer {
    margin: 15px 0 16px 0;
    a {
      font-family: var(--font-base);
      color: var(--color-0);
      font-weight: 600;
      text-decoration: underline;
      font-size: 12px;
      line-height: 1.6;
      letter-spacing: -0.01em;
    }
  }
}
</style>
