<template>
  <div v-if="isWidgetOpen" :data-size-large="isSizeLarge" class="widget">
    <div class="widget__content">
      <slot name="logo" />
      <div class="widget__container">
        <div class="widget__text">
          <slot name="title" />
          <slot name="subtitle" />
        </div>
        <Button
          :button-color="buttonColor"
          :is-bold="isButtonBold"
          @click="toggleDialog"
        >
          {{ buttonLabel }}
        </Button>
      </div>
      <div class="widget__close">
        <ButtonClose
          :icon-opacity="iconOpacity"
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
    isSizeLarge: Boolean,
    buttonLabel: {
      type: String,
      default: 'Learn More',
    },
    buttonColor: {
      type: String,
      default: 'var(--color-2)',
    },
    iconOpacity: {
      type: String,
      default: '1',
    },
    isButtonBold: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-dialog', 'close-widget'],
  methods: {
    toggleDialog(): void {
      this.$emit('toggle-dialog')
    },
    closeWidget(): void {
      this.$emit('close-widget')
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
