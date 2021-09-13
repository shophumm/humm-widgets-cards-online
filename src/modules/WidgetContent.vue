<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <slot name="logo" />
      <div class="widget__container">
        <div class="widget__text">
          <slot name="title" />
          <slot name="subtitle" />
        </div>
        <Button button-color="var(--color-2)" @click="toggleDialog">
          Explore
        </Button>
      </div>
      <div class="widget__close">
        <ButtonClose
          icon-opacity="1"
          fill="var(--color-1-contrast)"
          @click="closeWidget"
        >
          Close
        </ButtonClose>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'

export default defineComponent({
  name: 'WidgetContent',
  components: {
    Button,
    ButtonClose,
  },
  props: {
    isWidgetOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-dialog', 'close-widget'],
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
    closeWidget() {
      this.$emit('close-widget')
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

@import 'src/styles/cards.scss';
</style>
