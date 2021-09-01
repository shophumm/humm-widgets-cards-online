<template>
  <Theme :lang="lang" :theme="theme">
    <WidgetMainSmall
      title="Up To 60 months interest-free."
      subtitle="No deposit needed. T&Cs apply."
      button-primary-label="Explore"
      button-close-label="Close"
      :product-price="productPrice"
      :lang="lang"
      :theme="theme"
    />
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import WidgetMainSmall from 'src/widgets/WidgetMainSmall.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import type AppProps from 'src/models/App'

// TODO: i18n layer, use config/props to select widget type
export default defineComponent({
  name: 'App',
  components: {
    Theme,
    WidgetMainSmall,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: {
      type: String as () => ThemeEnum,
      default: (props: AppProps) => props.lang,
    },
  },
})
</script>
