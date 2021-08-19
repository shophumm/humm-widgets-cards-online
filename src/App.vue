<template>
  <Theme>
    <WidgetMainSmall
      title="Up To 60 months interest-free."
      subtitle="No deposit needed. T&Cs apply."
      buttonPrimaryLabel="Find out more"
      buttonCloseLabel="Close"
    />
    {{ productPrice }}
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
    productPrice: {
      type: Number,
    },
  },
})
</script>
