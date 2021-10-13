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
      <p v-if="isStandardProduct" class="widget__title">
        Up To
        <strong>{{ interestFreePeriod }} Months Interest-Free</strong>
      </p>
      <!-- TODO : update copy below -->
      <p v-if="isHybridProduct" class="widget__title">
        Hybrid Up To <strong>60 Months Interest-Free</strong>
      </p>
      <!-- TODO : update copy below -->
      <p v-if="isFixedProduct" class="widget__title">
        Fixed Up To <strong>60 Months Interest-Free</strong>
      </p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle">T&Cs Apply.</span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
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
    <template #footer>
      <ApplyCard
        :button-primary="true"
        button-color="var(--bg-2)"
        :is-button-rounded="false"
      >
        <template #title> Or apply for your Q Mastercard® </template>
        <template #subtitle> Apply now! It’s simple! </template>
      </ApplyCard>
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
import { TermProps } from 'src/models/Terms'
import WidgetContent from 'src/modules/WidgetContent.vue'
import CardsLogo from 'src/modules/CardsLogo.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ApplyCard from 'src/modules/ApplyCard.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'

export default defineComponent({
  name: 'WidgetMainQmc',
  components: {
    Card,
    WidgetContent,
    CardsLogo,
    DialogOverlay,
    ApplyCard,
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
      isStandardProduct: false,
      isFixedProduct: false,
      isHybridProduct: false,
      interestFreePeriod: '',
      interestFreeMonthlyRepayment: '',
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
    this.generateTitle()
  },
  methods: {
    generateTitle() {
      switch (this.products[0].productType.toLowerCase()) {
        case ProductEnum.Standard:
          this.interestFreePeriod = this.products[0].productItems[0].contents.find(
            item => item.key === 'interestFreePeriod'
          )?.value as string
          this.isStandardProduct = true
          break
        case ProductEnum.Hybrid:
          this.isHybridProduct = true
          break
        case ProductEnum.Fixed:
          this.interestFreePeriod = this.products[0].productItems[0].contents.find(
            item => item.key === 'interestFreePeriod'
          )?.value as string
          this.interestFreeMonthlyRepayment = this.products[0].productItems[0].contents.find(
            item => item.key === 'interestFreeMonthlyRepayment'
          )?.value as string
          this.isFixedProduct = true
          break
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
