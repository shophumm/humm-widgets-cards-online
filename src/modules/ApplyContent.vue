<template>
  <div class="cards cards--full cards--border">
    <p class="cards__title">Learn more about our credit card options.</p>
    <CardsList>
      <slot />
    </CardsList>
    <!-- TODO: link with button styling -->
    <Button href="#apply-now" size="lg" button-color="var(--color-2)">
      Apply now
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'src/components/buttons/Button.vue'
import CardsList from 'src/modules/CardsList.vue'

export default defineComponent({
  name: 'ApplyContent',
  components: {
    Button,
    CardsList,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';
</style>
