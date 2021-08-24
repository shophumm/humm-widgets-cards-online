<template>
  <Theme :lang="lang">
    <WidgetMainSmall
      title="Up To 60 Months Interest-Free."
      subtitle="No deposit needed. T&Cs apply."
      buttonPrimaryLabel="Explore"
      buttonCloseLabel="Close"
      :productPrice="productPrice"
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
