<template>
  <Theme v-if="!isLoading" :lang="lang" :theme="theme" :is-dark="darkMode">
    <Responsive>
      <template #default="{ isSizeLarge }">
        <component
          :is="currentWidget"
          :product-price="productPrice"
          :lang="lang"
          :theme="theme"
          :is-dark="darkMode"
          :is-size-large="isSizeLarge"
          :cards="cards"
          :products="products"
          :terms="terms"
        />
      </template>
    </Responsive>
  </Theme>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Theme from 'src/providers/Theme.vue'
import Responsive from 'src/providers/Responsive.vue'
import WidgetMainHumm90 from 'src/widgets/WidgetMainHumm90.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import AppProps from 'src/models/App'
import { fetchWidgetData } from 'src/utils/apiUtils'
import { getProductData, getCardsData } from 'src/utils/utils'

// TODO: i18n layer, use config/props to select widget type
export default defineComponent({
  name: 'App',
  components: {
    Theme,
    Responsive,
  },
  props: {
    productPrice: Number,
    darkMode: Boolean,
    merchantId: String,
    lang: String as () => LanguageCodeEnum,
    theme: {
      type: String as () => ThemeEnum,
      default: (props: AppProps) => props.lang,
    },
  },
  data() {
    return {
      isLoading: true,
      cards: [{}],
      products: [{}],
      terms: {},
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
    const responseData = await fetchWidgetData(
      this.merchantId,
      this.productPrice
    )
    if (responseData) {
      this.terms = responseData.terms
      this.products = getProductData(responseData.products)
      this.cards = getCardsData(responseData.cards)
      this.isLoading = false
    }
  },
})
</script>
