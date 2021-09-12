<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <div v-if="theme === Theme.Humm90" class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
      <!-- TODO: render cards dynamically -->
      <div
        v-if="theme === Theme.QMasterCard || theme === Theme.Farmers"
        class="cards"
      >
        <div class="cards__products">
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
        </div>
      </div>
      <div v-if="theme === Theme.HummGroup" class="widget__hummgroup">
        <IconHummGroup fill="var(--color-1-contrast)" />
      </div>
      <div class="widget__container">
        <div class="widget__text">
          <component
            :is="currentTitleComponent"
            :text="title"
            class="widget__title"
          />
          <span class="widget__subtitle">
            {{ updateFirstLetterToUpperCase(subtitle) }}
          </span>
        </div>
        <Button button-color="var(--color-2)" @click="isDialogOpen = true">
          {{ buttonPrimaryLabel }}
        </Button>
      </div>
      <div class="widget__close">
        <ButtonClose
          icon-opacity="1"
          fill="var(--color-1-contrast)"
          @click="closeWidget"
        >
          {{ buttonCloseLabel }}
        </ButtonClose>
      </div>
    </div>
  </div>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :tabs-data="tabs"
    :accordian-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>Monthly payments</template>
    <template #footer>
      <div v-if="theme === Theme.QMasterCard || theme === Theme.HummGroup">
        <div class="cards cards--full cards--border">
          <p class="cards__title">Learn more about our credit card options.</p>
          <div class="cards__products">
            <Card v-for="card in cards" :key="card.id" :size="card.size">
              <img src="../assets/images/humm90Card.png" :alt="card.alt" />
            </Card>
          </div>
          <!-- TODO: link with button styling -->
          <Button href="#apply-now" size="lg" button-color="var(--color-2)">
            Apply now
          </Button>
        </div>
      </div>
    </template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import IconHummGroup from 'src/components/icons/IconHummGroup.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import TitleAu from 'src/components/dataDisplay/TitleAu.vue'
import TitleQmc from 'src/components/dataDisplay/TitleQmc.vue'
import TitleFarmers from 'src/components/dataDisplay/TitleFarmers.vue'
import TitleHummGroup from 'src/components/dataDisplay/TitleHummGroup.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import fetchData from 'src/utils/apiUtils'
import { updateFirstLetterToUpperCase } from 'src/utils/utils'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainSmall',
  components: {
    IconHumm90Bird,
    IconHummGroup,
    Card,
    Button,
    ButtonClose,
    DialogOverlay,
  },
  props: {
    title: String,
    subtitle: String,
    buttonPrimaryLabel: String,
    buttonCloseLabel: String,
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      Theme: ThemeEnum,
      // TODO: replace placeholder data
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
      terms: `*Approved applicants only, fees, terms, conditions and minimum monthly payment [and minimum finance amount $<XX>][AU LEGAL NOTE: only include if a minimum finance amount applies] apply, including a $99 Annual Fee charged on first debit to your humm90 Account and annually thereafter; which attracts interest (charged at the humm90 Purchase Rate, currently 23.99% p.a) from the date charged unless fully paid within Interest Free Period and the Interest Free Criteria are met. Indicative monthly payment excl the Annual Fee and assumes no additional purchases, cash advances or other fees and no interest applies.

Indicative monthly payment is a minimum monthly repayment (MMP) of the greater of $30 or 3% of the outstanding balance for the first month, as the first month’s MMP is greater than the Transaction amount divided by the Interest Free Period. The MMP decreases each month as the Eligible Unpaid Balance decreases, therefore the purchase price of the Transaction will not be repaid within the Interest Free Period if you only pay the contractual MMP over the entire Interest Free Period.  Credit provided by humm Cards Pty Ltd ABN 31 099 651 877 Australian Credit Licence number 247415.

^ Indicative repayments (Transaction amount divided by Interest Free Period) are an estimate only, which excl $99 Annual Fee, and assumes no additional purchases, cash advances or other fees or charges. Interest Free Period available when indicative monthly repayments are made by each statement period due date, resulting in full repayment of purchase amount within the Interest Free Period. `,
    }
  },
  computed: {
    currentTitleComponent() {
      switch (this.theme) {
        case ThemeEnum.QMasterCard:
          return TitleQmc
        case ThemeEnum.Farmers:
          return TitleFarmers
        case ThemeEnum.HummGroup:
          return TitleHummGroup
        default:
          return TitleAu
      }
    },
  },
  created() {
    fetchData('widget', {
      method: 'POST',
    })
  },
  methods: {
    closeWidget() {
      this.isWidgetOpen = false
    },
    updateFirstLetterToUpperCase(sentence: string) {
      return updateFirstLetterToUpperCase(sentence)
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

@import 'src/styles/cards.scss';
</style>
