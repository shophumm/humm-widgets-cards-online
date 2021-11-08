<template>
  <WidgetContent
    :is-size-large="isSizeLarge"
    :is-widget-open="isWidgetOpen"
    button-color="var(--color-3)"
    :icon-opacity="isDark ? '0.8' : '0.3'"
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
      <span class="widget__subtitle">T&Cs apply.</span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :lang="lang"
    :product-price="productPrice"
    :products-data="products"
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
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'
import { getProductValueByKey, pluralize } from 'src/utils/utils'

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
    isDark: {
      type: Boolean,
      default: false,
    },
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
      type: String,
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
    }
  },
  computed: {
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 1)
    },
  },
  created() {
    this.createTitle()
  },
  methods: {
    getLongTermInterestFreeTitle() {
      const interestFreePeriod = getProductValueByKey(
        this.products[0],
        'interestFreePeriod'
      ) as number
      return `UP TO ${interestFreePeriod} ${pluralize(
        interestFreePeriod,
        'MONTH',
        'MONTHS'
      )} INTEREST-FREE.`
    },
    createTitle() {
      switch (this.products[0].productType.toLowerCase()) {
        case ProductEnum.LongTermInterestFree:
          this.title = this.getLongTermInterestFreeTitle()
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
