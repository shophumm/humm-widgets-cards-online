<template>
  <div class="cards cards--full">
    <p class="cards__title">Or apply for your humm®90 Platinum Mastercard®</p>
    <p class="cards__subtitle">
      Apply now! It takes 5-10 minutes on average to fill for most applicants.
    </p>
    <ol class="cards__list">
      <li>Start the online application by entering your details</li>
      <li>Provide employment, income and expense information</li>
      <li>
        If approved, you can return and use interest-free as your payment option
      </li>
    </ol>

    <Button
      href="#apply-now"
      size="md"
      button-color="var(--color-2)"
      :is-rounded="true"
    >
      Apply now
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'src/components/buttons/Button.vue'

export default defineComponent({
  name: 'Humm90PlatinumCardApply',
  components: {
    Button,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';
</style>
