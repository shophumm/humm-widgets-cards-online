<template>
  <WidgetContent
    :is-size-large="isSizeLarge"
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
  <div>isSizeLarge: {{ isSizeLarge }}</div>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :tabs-data="products"
    :accordion-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHummGroup from 'src/components/icons/IconHummGroup.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import CardProps from 'src/models/Card'
import { ProductItemProps } from 'src/models/Tabs'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainHummGroup',
  components: {
    IconHummGroup,
    WidgetContent,
    DialogOverlay,
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
