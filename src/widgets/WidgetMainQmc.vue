<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
    :is-button-bold="true"
    button-label="Learn More"
    button-color="var(--color-1)"
    icon-opacity="0.3"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <CardsLogo>
        <Card>
          <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
        </Card>
        <Card>
          <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
        </Card>
      </CardsLogo>
    </template>
    <template #title>
      <p class="widget__title">
        Up To <strong>60 Months Interest-Free</strong>
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
    :tabs-data="tabs"
    :accordion-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #footer>
      <MastercardApply>
        <Card v-for="card in cards" :key="card.id" :size="card.size">
          <img src="../assets/images/humm90Card.png" :alt="card.alt" />
        </Card>
      </MastercardApply>
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
import MastercardApply from 'src/modules/MastercardApply.vue'

export default defineComponent({
  name: 'WidgetMainQmc',
  components: {
    Card,
    WidgetContent,
    CardsLogo,
    DialogOverlay,
    MastercardApply,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
    data: {
      type: Object as () => {
        cards: CardProps
        tabs: TabProps
        terms: string
      },
      required: true,
    },
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      buttonCloseLabel: 'Close',
      Theme: ThemeEnum,
      cards: this.data.cards,
      tabs: this.data.tabs,
      terms: this.data.terms,
    }
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
