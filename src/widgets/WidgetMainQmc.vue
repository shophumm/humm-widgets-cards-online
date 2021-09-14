<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <div class="cards">
        <div class="cards__products">
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
        </div>
      </div>
    </template>
    <template #title>
      <p class="widget__title">
        Up To <strong>60 Months Interest-Free</strong>
      </p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle"> Indicative Payments. Ts&Cs Apply. </span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :tabs-data="tabs"
    :accordian-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>Monthly payments</template>
    <template #footer>
      <ApplyContent>
        <Card v-for="card in cards" :key="card.id" :size="card.size">
          <img src="../assets/images/humm90Card.png" :alt="card.alt" />
        </Card>
      </ApplyContent>
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
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import ApplyContent from 'src/modules/ApplyContent.vue'

export default defineComponent({
  name: 'WidgetMainQmc',
  components: {
    Card,
    WidgetContent,
    DialogOverlay,
    ApplyContent,
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

@import 'src/styles/cards.scss';
</style>
