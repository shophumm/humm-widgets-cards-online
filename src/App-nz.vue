<template>
  <Theme :lang="lang" :theme="theme">
    <component
      :is="currentWidget"
      :product-price="productPrice"
      :lang="lang"
      :theme="theme"
      :cards="cards"
      :tabs="tabs"
      :terms="terms"
    />
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import WidgetMainQmc from 'src/widgets/WidgetMainQmc.vue'
import WidgetMainFarmers from 'src/widgets/WidgetMainFarmers.vue'
import WidgetMainHummGroup from 'src/widgets/WidgetMainHummGroup.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import AppProps from 'src/models/App'
import ResponseProps from 'src/models/Response'
import fetchData from 'src/utils/apiUtils'
import { getTabsData, getCardsData } from 'src/utils/utils'

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
      cards: [{}],
      tabs: [{}],
      terms: '',
    }
  },
  computed: {
    currentWidget() {
      switch (this.theme) {
        case ThemeEnum.QMasterCard:
          return WidgetMainQmc
        case ThemeEnum.Farmers:
          return WidgetMainFarmers
        case ThemeEnum.HummGroup:
          return WidgetMainHummGroup
        default:
          return WidgetMainQmc
      }
    },
  },
  async created() {
    const responseData = ((await fetchData('widget', {
      method: 'POST',
    })) as unknown) as ResponseProps
    this.terms = responseData.terms
    this.tabs = getTabsData(responseData.products)
    this.cards = getCardsData(responseData.cards)
  },
})
</script>
