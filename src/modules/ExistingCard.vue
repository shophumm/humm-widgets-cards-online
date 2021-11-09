<template>
  <div class="cards">
    <CardsList>
      <slot name="cards" />
    </CardsList>
  </div>
  <p class="mc__title">
    <slot name="title">Have a card already?</slot>
  </p>
  <p class="mc__subtitle">
    <slot name="subtitle">Enjoy interest-free shopping now!</slot>
  </p>
  <ol class="mc__list">
    <slot name="list">
      <li>Add the item and continue to checkout</li>
      <li>
        Choose <strong>{{ getPaymentOption() }}</strong> as your payment option
      </li>
      <li>Enter your card details and choose a plan listed below:</li>
    </slot>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardsList from 'src/modules/CardsList.vue'
import { ProductItemProps } from 'src/models/Tabs'
import ProductEnum from 'src/models/enums/ProductEnum'

export default defineComponent({
  name: 'ExistingCard',
  components: {
    CardsList,
  },
  props: {
    product: {
      type: Object as () => ProductItemProps,
      required: true,
    },
  },
  methods: {
    getPaymentOption(): string {
      switch (this.product.productType) {
        case ProductEnum.LongTermInterestFree:
          return 'Long Term Finance'
        case ProductEnum.PaymentHoliday:
          return 'Payment Holiday'
        default:
          return this.product.productType
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';

.mc {
  &__title {
    font-weight: 700;
    font-size: 20px;
    margin-top: 24px;
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
    list-style-type: decimal;
  }
}
</style>
