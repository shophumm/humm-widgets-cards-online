<template>
  <WidgetContent
    :is-size-large="isSizeLarge"
    :is-widget-open="isWidgetOpen"
    button-color="var(--color-3)"
    :icon-opacity="isDark ? '0.8' : '0.3'"
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
    :product="displayedProduct"
    :accordion-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>
      <ExistingCard :product="displayedProduct">
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
import { ProductItemProps } from 'src/models/Tabs'
import WidgetContent from 'src/modules/WidgetContent.vue'
import CardsLogo from 'src/modules/CardsLogo.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'
import { getProductValueByKey, pluralize } from 'src/utils/utils'

const cardId = 'QMC1'

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
    isDark: {
      type: Boolean,
      default: false,
    },
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
      type: String,
      required: true,
    },
  },
  data(): {
    isWidgetOpen: boolean
    isDialogOpen: boolean
    buttonCloseLabel: string
    Theme: typeof ThemeEnum
    displayedProduct: ProductItemProps
    cardAccountFee: number | undefined
    cardStandardInterestRate: number | undefined
    title: string
    subtitle: string
  } {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      buttonCloseLabel: 'Close',
      Theme: ThemeEnum,
      displayedProduct: {} as ProductItemProps,
      cardAccountFee: undefined,
      cardStandardInterestRate: undefined,
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
    this.setProduct()
    this.getCardAccountFee()
    this.getCardStandardInterestRate()
    this.createTitle()
    this.createSubtitle()
  },
  methods: {
    setProduct() {
      this.displayedProduct = this.products[0]
    },
    getCardAccountFee() {
      this.cardAccountFee = this.cards.find(
        card => card.id === cardId
      )?.annualFee
    },
    getCardStandardInterestRate() {
      this.cardStandardInterestRate = this.cards.find(
        card => card.id === cardId
      )?.interestRate
    },
    getLongTermInterestFreeTitle() {
      const interestFreePeriod = getProductValueByKey(
        this.displayedProduct,
        'interestFreePeriod'
      ) as number
      const indicativeMinMonthly = getProductValueByKey(
        this.displayedProduct,
        'indicativeMinMonthly'
      ) as number
      return `${interestFreePeriod} ${pluralize(
        interestFreePeriod,
        'Month',
        'Monthly'
      )} ${pluralize(
        interestFreePeriod,
        'Payment'
      )} of $${indicativeMinMonthly}*`
    },
    getPaymentHolidayTitle() {
      const interestFreePeriod = getProductValueByKey(
        this.displayedProduct,
        'interestFreePeriod'
      ) as number
      return `${interestFreePeriod} ${pluralize(
        interestFreePeriod,
        'Month'
      )} No Payments & No Interest`
    },
    getLongTermInterestFreeSubtitle(
      establishmentFee: number,
      advancedFee: number
    ) {
      if (establishmentFee === 0 || advancedFee === 0) {
        return `*indicative. $${this.cardAccountFee} annual Account Fee, Ts&Cs apply.`
      }
      return `*indicative. $${establishmentFee} Establishment Fee or $${advancedFee} Advance Fee, $${this.cardAccountFee} annual Account Fee, Ts&Cs apply.`
    },
    getPaymentHolidaySubtitle(establishmentFee: number, advancedFee: number) {
      if (establishmentFee === 0 || advancedFee === 0) {
        return `Standard Interest Rate ${this.cardStandardInterestRate}% applies at the end of the interest free period. $${this.cardAccountFee} annual Account Fee. Ts&Cs apply.`
      }
      return `Standard Interest Rate ${this.cardStandardInterestRate}% applies at the end of the interest free period. $${establishmentFee} Establishment Fee or $${advancedFee} Advance Fee applies. $${this.cardAccountFee} annual Account Fee. Ts&Cs apply.`
    },
    createTitle() {
      switch (this.displayedProduct.productType) {
        case ProductEnum.LongTermInterestFree:
          this.title = this.getLongTermInterestFreeTitle()
          break
        case ProductEnum.PaymentHoliday:
          this.title = this.getPaymentHolidayTitle()
          break
      }
    },
    createSubtitle() {
      const establishmentFee = getProductValueByKey(
        this.displayedProduct,
        'establishmentFee'
      ) as number
      const advancedFee = getProductValueByKey(
        this.displayedProduct,
        'advancedFee'
      ) as number
      switch (this.displayedProduct.productType) {
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
