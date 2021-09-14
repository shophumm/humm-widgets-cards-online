<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
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
    :tabs-data="tabs"
    :accordian-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>Monthly payments</template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import CardProps from 'src/models/Card'
import TabProps from 'src/models/Tabs'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainHumm90',
  components: {
    IconHumm90Bird,
    WidgetContent,
    DialogOverlay,
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
