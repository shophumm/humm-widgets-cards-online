<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
    icon-opacity="0.3"
    button-color="var(--color-3)"
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
        <strong>Up To 60 Months Interest-Free</strong>
      </p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle">Indicative Payments. Ts&Cs Apply.</span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :tabs-data="tabs"
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
        <template #title>Have a Farmers Mastercard® or Q Mastercard®?</template>
      </ExistingCard>
    </template>
    <template #footer>
      <ApplyCard>
        <template #title> Or apply for your Farmers Mastercard® </template>
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
import CardProps from 'src/models/Card'
import TabProps from 'src/models/Tabs'
import WidgetContent from 'src/modules/WidgetContent.vue'
import CardsLogo from 'src/modules/CardsLogo.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ApplyCard from 'src/modules/ApplyCard.vue'
import ExistingCard from 'src/modules/ExistingCard.vue'

export default defineComponent({
  name: 'WidgetMainFarmers',
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
    tabs: {
      type: Array as () => TabProps[],
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
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
