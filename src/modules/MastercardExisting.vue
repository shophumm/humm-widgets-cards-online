<template>
  <div class="cards">
    <CardsList>
      <Card size="lg">
        <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
      </Card>
      <Card size="lg">
        <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
      </Card>
    </CardsList>
  </div>
  <p class="mc__title">Have a Farmers Mastercard® or Q Mastercard®?</p>
  <p class="mc__subtitle">Enjoy interest-free shopping now!</p>
  <ol class="mc__list">
    <li>Add the item and continue to checkout</li>
    <li>Choose interest-free as your payment option</li>
    <li>Enter your card details and choose a plan listed below:</li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardsList from 'src/modules/CardsList.vue'
import Card from 'src/components/dataDisplay/Card.vue'

export default defineComponent({
  name: 'MastercardExisting',
  components: {
    CardsList,
    Card,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';

.mc {
  &__title {
    font-weight: 700;
    font-size: 20px;
  }

  &__subtitle,
  &__list {
    font-size: 14px;
  }

  &__subtitle {
    margin-bottom: 2px;
  }

  &__list {
    margin: 0;
    padding-left: 5px;
    list-style-position: inside;
  }
}
</style>
