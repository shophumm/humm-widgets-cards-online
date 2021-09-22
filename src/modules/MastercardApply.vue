<template>
  <div class="cards cards--full">
    <p class="cards__title">Or apply for your Farmers Mastercard®</p>
    <p class="cards__subtitle">Apply now! It’s simple!</p>
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
  name: 'MastercardApply',
  components: {
    Button,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';
</style>
