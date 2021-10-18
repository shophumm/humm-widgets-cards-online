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
      <div class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
    </template>
    <template #title>
      <p class="widget__title">UP TO 60 MONTHS INTEREST-FREE.</p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle"> Indicative Payments. Ts&Cs Apply. </span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :lang="lang"
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
        <template #title>Have a humm®90 Platinum Mastercard®?</template>
      </ExistingCard>
    </template>
    <template #footer>
      <ApplyCard
        :button-primary="true"
        button-color="var(--bg-2)"
        button-label="APPLY NOW"
      >
        <template #title>
          Or apply for your humm®90 Platinum Mastercard®
        </template>
        <template #subtitle>
          Apply now! It takes 5-10 minutes on average to fill for most
          applicants.
        </template>
      </ApplyCard>
    </template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import CardProps from 'src/models/Card'
import { ProductItemProps } from 'src/models/Tabs'
import { TermProps } from 'src/models/Terms'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ApplyCard from 'src/modules/ApplyCard.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'

export default defineComponent({
  name: 'WidgetMainHumm90',
  components: {
    IconHumm90Bird,
    WidgetContent,
    DialogOverlay,
    Card,
    ExistingCard,
    ApplyCard,
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
    }
  },
  computed: {
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 1)
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
