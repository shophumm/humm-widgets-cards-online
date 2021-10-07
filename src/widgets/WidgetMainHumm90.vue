<template>
  <div ref="box" class="box" :data-size-large="isSizeLarge">
    <WidgetContent
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
        <span class="widget__subtitle">
          Indicative Payments. Ts&Cs Apply.
        </span>
      </template>
    </WidgetContent>
    <div>width: {{ width }}</div>
  </div>

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
  emits: ['resize'],
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      buttonCloseLabel: 'Close',
      Theme: ThemeEnum,
      width: 0,
      isSizeLarge: undefined,
      observer: {} as ResizeObserver,
    }
  },
  computed: {
    getApplyCards(): CardProps[] {
      return this.cards.slice(0, 1)
    },
  },
  mounted() {
    // initialize the observer on mount
    this.initObserver()
  },
  beforeUnmount() {
    if (this.observer) this.observer?.unobserve(this.$refs.box as Element)
  },
  methods: {
    onResize() {
      const box = this.$refs.box as Element
      console.log({ box })
      const width = box.clientWidth

      this.width = width
      console.log({ width })

      if (width > 410) {
        this.isSizeLarge = true
      } else {
        this.isSizeLarge = false
      }

      // Optionally, emit event with dimensions
      this.$emit('resize', { width })
    },
    initObserver() {
      const observer = new ResizeObserver(this.onResize)
      observer.observe(this.$refs.box as Element)
      this.observer = observer
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';
</style>
