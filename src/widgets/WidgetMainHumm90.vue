<template>
  <WidgetContent
    :is-size-large="isSizeLarge"
    :is-widget-open="isWidgetOpen"
    button-color="var(--color-3)"
    icon-opacity="0.3"
    button-label="LEARN MORE"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <IconHumm90Card />
    </template>
    <template #title>
      <p class="widget__title">{{ title }}</p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle">{{ subtitle }}</span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :lang="lang"
    :product-price="productPrice"
    :tabs-data="products"
    accordion-title="TERMS & CONDITIONS"
    :accordion-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>
      <ExistingCard>
        <template #cards>
          <Card v-for="card in getApplyCards" :key="card.id" size="lg">
            <img :src="card.src" :alt="card.alt" />
          </Card>
        </template>
        <template #title>Have a humm®90 Platinum Mastercard®?</template>
      </ExistingCard>
    </template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Card from 'src/components/icons/IconHumm90Card.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ProductEnum from 'src/models/enums/ProductEnum'
import CardProps from 'src/models/Card'
import { ProductItemProps } from 'src/models/Tabs'
import { TermProps } from 'src/models/Terms'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'

export default defineComponent({
  name: 'WidgetMainHumm90',
  components: {
    IconHumm90Card,
    WidgetContent,
    DialogOverlay,
    Card,
    ExistingCard,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
    isSizeLarge: {
      type: Boolean,
      required: true,
    },
    cards: {
      type: Array as () => CardProps[],
      required: true,
    },
    products: {
      type: Array as () => ProductItemProps[],
      required: true,
    },
    terms: {
      type: Object as () => TermProps,
      required: true,
    },
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      buttonCloseLabel: 'Close',
      Theme: ThemeEnum,
      title: '',
      subtitle: '',
    }
  },
  computed: {
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 1)
    },
  },
  created() {
    this.title = this.createTitle()
    this.subtitle = this.createSubtitle()
  },
  methods: {
    getStandardTitle() {
      return `UP TO ${
        this.products[0].productItems[0].contents.find(
          item => item.key === 'interestFreePeriod'
        )?.value
      } MONTHS INTEREST FREE.`
    },
    getFixedTitle() {
      return `GET ME FOR $${
        this.products[0].productItems[0].contents.find(
          item => item.key === 'interestFreeMonthlyRepayment'
        )?.value
      } PER MONTH OVER ${
        this.products[0].productItems[0].contents.find(
          item => item.key === 'interestFreePeriod'
        )?.value
      } MONTHS`
    },
    createTitle() {
      switch (this.products[0].productType.toLowerCase()) {
        case ProductEnum.Standard:
          return this.getStandardTitle()
        case ProductEnum.PaymentHoliday:
          // TODO : update copy below
          return 'PaymentHoliday Title'
        case ProductEnum.Fixed:
          return this.getFixedTitle()
        default:
          // TODO : update copy below
          return 'Default Title'
      }
    },
    createSubtitle() {
      switch (this.products[0].productType.toLowerCase()) {
        case ProductEnum.Standard:
          return 'T&Cs apply.'
        case ProductEnum.PaymentHoliday:
          // TODO : update copy below
          return 'PaymentHoliday subTitle'
        case ProductEnum.Fixed:
          return 'Indicative payments. T&Cs apply.'
        default:
          // TODO : update copy below
          return 'Default subTitle'
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
