<template>
  <WidgetContent
    :is-widget-open="isWidgetOpen"
    @toggle-dialog="isDialogOpen = true"
    @close-widget="isWidgetOpen = false"
  >
    <template #logo>
      <div class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
    </template>
    <template #title>
      <p class="widget__title">UP TO 60 MONTHS INTEREST-FREE.</p>
    </template>
    <template #subtitle>
      <span class="widget__subtitle"> Indicative Payments. Ts&Cs Apply. </span>
    </template>
  </WidgetContent>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    :tabs-data="tabs"
    :accordian-data="terms"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #header>Monthly payments</template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import fetchData from 'src/utils/apiUtils'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainHumm90',
  components: {
    IconHumm90Bird,
    WidgetContent,
    DialogOverlay,
  },
  props: {
    productPrice: Number,
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
      buttonCloseLabel: 'Close',
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
  created() {
    fetchData('widget', {
      method: 'POST',
    })
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

@import 'src/styles/cards.scss';
</style>
