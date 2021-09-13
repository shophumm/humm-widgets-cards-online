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
      default: (props: AppProps) => props.lang,
    },
  },
  computed: {
    currentWidget() {
      switch (this.theme) {
        case ThemeEnum.Humm90:
          return WidgetMainHumm90
        default:
          return WidgetMainHumm90
      }
    },
  },
})
</script>
