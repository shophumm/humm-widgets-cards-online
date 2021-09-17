<template>
  <Theme :lang="lang" :theme="theme">
    <component
      :is="currentWidget"
      :product-price="productPrice"
      :lang="lang"
      :theme="theme"
      :tabs="tabs"
      :terms="terms"
    />
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import WidgetMainHumm90 from 'src/widgets/WidgetMainHumm90.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import AppProps from 'src/models/App'
import WidgetResponseBody from 'src/models/Response'
import fetchData from 'src/utils/apiUtils'
import { getTabsData } from 'src/utils/utils'

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
  data() {
    return {
      tabs: [{}],
      terms: '',
    }
  },
  computed: {
    currentWidget() {
      // TODO: add future AU variants below
      switch (this.theme) {
        case ThemeEnum.Humm90:
          return WidgetMainHumm90
        default:
          return WidgetMainHumm90
      }
    },
  },
  async created() {
    const responseData = (await (fetchData('widget', {
      method: 'POST',
    }) as unknown)) as WidgetResponseBody
    this.terms = responseData.terms
    this.tabs = getTabsData(responseData.products)
  },
})
</script>
