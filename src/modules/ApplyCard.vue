<template>
  <div class="cards cards--full">
    <p class="cards__title">
      <slot name="title">Or apply for a card</slot>
    </p>
    <p class="cards__subtitle">
      <slot name="subtitle">Apply now!</slot>
    </p>
    <ol class="cards__list">
      <slot name="list">
        <li>Start the online application by entering your details</li>
        <li>Provide employment, income and expense information</li>
        <li>
          If approved, you can return and use interest-free as your payment
          option
        </li>
      </slot>
    </ol>

    <Button
      href="#apply-now"
      size="md"
      :button-color="buttonColor"
      :is-rounded="true"
      :primary="buttonPrimary"
    >
      Apply now
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'src/components/buttons/Button.vue'

export default defineComponent({
  name: 'ApplyCard',
  components: {
    Button,
  },
  props: {
    buttonPrimary: {
      type: Boolean,
      default: false,
    },
    buttonColor: {
      type: String,
      default: 'var(--color-2)',
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';
</style>
