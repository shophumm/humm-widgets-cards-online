<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <div class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
      <div class="widget__container">
        <div class="widget__text">
          <p class="widget__title">UP TO 60 MONTHS INTEREST-FREE.</p>
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
  <Overlay :is-dialog-open="isDialogOpen" @toggle="isDialogOpen = false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import fetchData from 'src/utils/apiUtils'
import Overlay from 'src/modules/Overlay.vue'

export default defineComponent({
  name: 'WidgetMainHumm90',
  components: {
    IconHumm90Bird,
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
