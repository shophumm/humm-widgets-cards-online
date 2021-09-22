<template>
  <Theme :lang="lang" :theme="theme" :is-dark="darkMode">
    <component
      :is="currentWidget"
      :product-price="productPrice"
      :lang="lang"
      :theme="theme"
      :data="{
        cards: cards,
        tabs: tabs,
        terms: terms,
      }"
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
import type AppProps from 'src/models/App'
import fetchData from 'src/utils/apiUtils'

// TODO: i18n layer, use config/props to select widget type
export default defineComponent({
  name: 'App',
  components: {
    Theme,
  },
  props: {
    productPrice: Number,
    darkMode: Boolean,
    lang: String as () => LanguageCodeEnum,
    theme: {
      type: String as () => ThemeEnum,
      default: (props: AppProps) => props.lang,
    },
  },
  data() {
    return {
      cards: [
        {
          id: 'card1',
          size: 'lg',
          alt: 'Humm90 card',
        },
        {
          id: 'card2',
          size: 'lg',
          alt: 'Humm90 card',
        },
        {
          id: 'card3',
          size: 'lg',
          alt: 'Humm90 card',
        },
        {
          id: 'card4',
          size: 'lg',
          alt: 'Humm90 card',
        },
      ],
      tabs: [
        {
          id: '12months',
          label: '12 months',
          contents: [
            { name: 'Interest free period', value: '12 months' },
            { name: 'Purchase amount', value: '$1,699.00' },
            { name: 'Establishment fee', value: '$50.00' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.50',
            },
          ],
        },
        {
          id: '18months',
          label: '18 months',
          contents: [
            { name: 'Interest free period', value: '18 months' },
            { name: 'Purchase amount', value: '$1,699.00' },
            { name: 'Establishment fee', value: '$50.00' },
            {
              name: 'Indicative minimum monthly repayments*',
              value: '$48.00',
            },
            {
              name:
                'Indicative repayment to pay before Interest free period expires ^',
              value: '$450.50',
            },
          ],
        },
      ],
      terms: `*Approved applicants only, fees, terms, conditions and minimum monthly payment [and minimum finance amount $<XX>][AU LEGAL NOTE: only include if a minimum finance amount applies] apply, including a $99 Annual Fee charged on first debit to your humm90 Account and annually thereafter; which attracts interest (charged at the humm90 Purchase Rate, currently 23.99% p.a) from the date charged unless fully paid within Interest Free Period and the Interest Free Criteria are met. Indicative monthly payment excl the Annual Fee and assumes no additional purchases, cash advances or other fees and no interest applies.`,
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
  created() {
    fetchData('widget', {
      method: 'POST',
    })
  },
})
</script>
