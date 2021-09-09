<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <div class="widget__hummgroup">
        <IconHummGroup fill="var(--color-1-contrast)" />
      </div>
      <div class="widget__container">
        <div class="widget__text">
          <p class="widget__title">
            3 Years. <strong>First 12 Months Interest Free.</strong>
          </p>
          <span class="widget__subtitle">
            Indicative Payments. Ts&Cs Apply.
          </span>
        </div>
        <Button button-color="var(--color-2)" @click="isDialogOpen = true">
          Explore
        </Button>
      </div>
      <div class="widget__close">
        <ButtonClose
          icon-opacity="1"
          fill="var(--color-1-contrast)"
          @click="closeWidget"
        >
          Close
        </ButtonClose>
      </div>
    </div>
  </div>
  <Overlay
    :is-dialog-open="isDialogOpen"
    :has-apply-now="true"
    @toggle="isDialogOpen = false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHummGroup from 'src/components/icons/IconHummGroup.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import fetchData from 'src/utils/apiUtils'
import Overlay from 'src/modules/Overlay.vue'

export default defineComponent({
  name: 'WidgetMainHummGroup',
  components: {
    IconHummGroup,
    Button,
    ButtonClose,
    Overlay,
  },
  props: {
    productPrice: Number,
    theme: String as () => ThemeEnum,
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      Theme: ThemeEnum,
      // TODO: replace placeholder data
    }
  },
  created() {
    fetchData('widget', {
      method: 'POST',
    })
  },
  methods: {
    closeWidget() {
      this.isWidgetOpen = false
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';

@import 'src/styles/widget.scss';
</style>
