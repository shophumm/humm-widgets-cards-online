<template>
  <Theme :lang="lang">
    <WidgetMainSmall
      title="Up To 60 months interest-free."
      subtitle="No deposit needed. T&Cs apply."
      button-primary-label="Explore"
      button-close-label="Close"
      :product-price="productPrice"
      :lang="lang"
    />
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import WidgetMainSmall from 'src/widgets/WidgetMainSmall.vue'

// TODO: i18n layer, use config/props to select widget type
export default defineComponent({
  name: 'App',
  components: {
    Theme,
    WidgetMainSmall,
  },
  props: {
    productPrice: Number,
    lang: String,
  },
})
</script>
