<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <div class="widget__hummgroup">
        <IconHummGroup fill="var(--color-1-contrast)" />
      </div>
    </template>
    <template #title>
      <p class="widget__title">
        3 Years. <strong>First 12 Months Interest-Free</strong>
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
import IconHummGroup from 'src/components/icons/IconHummGroup.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import CardProps from 'src/models/Card'
import TabProps from 'src/models/Tabs'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'
import MastercardApply from 'src/modules/MastercardApply.vue'

export default defineComponent({
  name: 'WidgetMainHummGroup',
  components: {
    IconHummGroup,
    Card,
    WidgetContent,
    DialogOverlay,
    MastercardApply,
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
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 4)
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
