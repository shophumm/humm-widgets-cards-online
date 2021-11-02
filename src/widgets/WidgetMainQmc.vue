<template>
  <WidgetContent
    :is-size-large="isSizeLarge"
    :is-widget-open="isWidgetOpen"
    :is-button-bold="true"
    button-color="var(--color-3)"
    icon-opacity="0.3"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <CardsLogo>
        <Card v-for="card in getLogoCards" :key="card.id" size="sm">
          <img :src="card.src" :alt="card.alt" />
        </Card>
      </CardsLogo>
    </template>
    <template #title>
      <p class="widget__title">
        <strong>{{ title }}</strong>
      </p>
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
        <template #title>Have a Q Mastercard® or Q Card?</template>
      </ExistingCard>
    </template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'src/components/dataDisplay/Card.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ProductEnum from 'src/models/enums/ProductEnum'
import CardProps from 'src/models/Card'
import { ProductItemProps, TabItemProps } from 'src/models/Tabs'
import { TermProps } from 'src/models/Terms'
import WidgetContent from 'src/modules/WidgetContent.vue'
import CardsLogo from 'src/modules/CardsLogo.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'

export default defineComponent({
  name: 'WidgetMainQmc',
  components: {
    Card,
    WidgetContent,
    CardsLogo,
    DialogOverlay,
    ExistingCard,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
    cards: {
      type: Array as () => CardProps[],
      required: true,
    },
    isSizeLarge: {
      type: Boolean,
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
      primaryProduct: {
        productType: '' as ProductEnum,
        productItems: [] as TabItemProps[],
      },
      cardAccountFee: undefined as number | undefined,
      cardStandardInterestRate: undefined as number | undefined,
      title: '',
      subtitle: '',
    }
  },
  computed: {
    getLogoCards(): CardProps[] {
      return this.cards.slice(0, 2)
    },
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 4)
    },
  },
  created() {
    this.getPrimaryProduct()
    this.getCardAccountFee()
    this.getCardStandardInterestRate()
    this.createTitle()
    this.createSubtitle()
  },
  methods: {
    getPrimaryProduct() {
      this.primaryProduct.productType = this.products[0].productType
      this.primaryProduct.productItems = this.products[0].productItems
    },
    getCardAccountFee() {
      this.cardAccountFee = this.cards.find(
        card => card.id === 'QMC1'
      )?.annualFee
    },
    getCardStandardInterestRate() {
      this.cardStandardInterestRate = this.cards.find(
        card => card.id === 'QMC1'
      )?.interestRate
    },
    getLongTermInterestFreeTitle() {
      const interestFreePeriod = this.primaryProduct.productItems[0].contents.find(
        item => item.key === 'interestFreePeriod'
      )?.value
      const indicativeMinMonthly = this.primaryProduct.productItems[0].contents.find(
        item => item.key === 'indicativeMinMonthly'
      )?.value
      return `${interestFreePeriod} Month${
        interestFreePeriod === 1 ? '' : 'ly'
      } Payment${
        interestFreePeriod === 1 ? '' : 's'
      } of $${indicativeMinMonthly}*`
    },
    getPaymentHolidayTitle() {
      const interestFreePeriod = this.primaryProduct.productItems[0].contents.find(
        item => item.key === 'interestFreePeriod'
      )?.value
      return `${interestFreePeriod} Month${
        interestFreePeriod === 1 ? '' : 's'
      } No Payments & No Interest`
    },
    getLongTermInterestFreeSubtitle(
      establishmentFee: number,
      advancedFee: number
    ) {
      if (establishmentFee === 0 || advancedFee === 0)
        return `*indicative. $${this.cardAccountFee} annual Account Fee, Ts&Cs apply.`
      return `*indicative. $${establishmentFee} Establishment Fee or $${advancedFee} Advance Fee, $${this.cardAccountFee} annual Account Fee, Ts&Cs apply.`
    },
    getPaymentHolidaySubtitle(establishmentFee: number, advancedFee: number) {
      if (establishmentFee === 0 || advancedFee === 0)
        return `Standard Interest Rate ${this.cardStandardInterestRate}% applies at the end of the interest free period. $${this.cardAccountFee} annual Account Fee. Ts&Cs apply.`
      return `Standard Interest Rate ${this.cardStandardInterestRate}% applies at the end of the interest free period. $${establishmentFee} Establishment Fee or $${advancedFee} Advance Fee applies. $${this.cardAccountFee} annual Account Fee. Ts&Cs apply.`
    },
    createTitle() {
      switch (this.primaryProduct.productType) {
        case ProductEnum.LongTermInterestFree:
          this.title = this.getLongTermInterestFreeTitle()
          break
        case ProductEnum.PaymentHoliday:
          this.title = this.getPaymentHolidayTitle()
          break
      }
    },
    createSubtitle() {
      const establishmentFee = this.primaryProduct.productItems[0].contents.find(
        item => item.key === 'establishmentFee'
      )?.value as number
      const advancedFee = this.primaryProduct.productItems[0].contents.find(
        item => item.key === 'advancedFee'
      )?.value as number
      console.log({ advancedFee })
      switch (this.primaryProduct.productType) {
        case ProductEnum.LongTermInterestFree:
          this.subtitle = this.getLongTermInterestFreeSubtitle(
            establishmentFee,
            advancedFee
          )
          break
        case ProductEnum.PaymentHoliday:
          this.subtitle = this.getPaymentHolidaySubtitle(
            establishmentFee,
            advancedFee
          )
          break
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
