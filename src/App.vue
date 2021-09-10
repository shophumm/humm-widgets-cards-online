<template>
  <Theme :lang="lang" :theme="theme">
    <component
      :is="currentWidget"
      :product-price="productPrice"
      :theme="theme"
    />
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import WidgetMainHumm90 from 'src/widgets/WidgetMainHumm90.vue'
import WidgetMainQmc from 'src/widgets/WidgetMainQmc.vue'
import WidgetMainFarmers from 'src/widgets/WidgetMainFarmers.vue'
import WidgetMainHummGroup from 'src/widgets/WidgetMainHummGroup.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import type AppProps from 'src/models/App'

// TODO: i18n layer, use config/props to select widget type
export default defineComponent({
  name: 'App',
  components: {
    Theme,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: {
      type: String as () => ThemeEnum,
      default: (props: AppProps) => 'qmc',
    },
  },
  computed: {
    currentWidget() {
      switch (this.theme) {
        case ThemeEnum.Humm90:
          return WidgetMainHumm90
        case ThemeEnum.QMasterCard:
          return WidgetMainQmc
        case ThemeEnum.Farmers:
          return WidgetMainFarmers
        case ThemeEnum.HummGroup:
          return WidgetMainHummGroup
        default:
          return WidgetMainHumm90
      }
    },
  },
})
</script>
