<template>
  <div class="widget">
    <div class="widget__text">
      <p class="widget__title">{{ title }}</p>
      <span class="widget__subtitle">{{ subtitle }}</span>
    </div>
    <Button buttonColor="var(--color-2)" @click="isDialogOpen = true">{{
      buttonPrimaryLabel
    }}</Button>
    <IconHumm90Bird fill="var(--color-1-contrast)" />
    <ButtonClose iconOpacity="0.5">{{ buttonCloseLabel }}</ButtonClose>
  </div>

  <Dialog v-if="isDialogOpen" @toggle-dialog="isDialogOpen = false">
    <template v-slot:body>
      <Tabs :tabs="tabs" />
      <Accordion id="widget-terms" :content="terms"
        >Terms & Conditions</Accordion
      >
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import Dialog from 'src/components/dialog/Dialog.vue'
import Tabs from 'src/components/tabs/Tabs.vue'
import Accordion from 'src/components/accordion/Accordion.vue'

export default defineComponent({
  name: 'WidgetMainSmall',
  props: {
    title: String,
    subtitle: String,
    buttonPrimaryLabel: String,
    productPrice: Number,
  },
  components: {
    IconHumm90Bird,
    Button,
    ButtonClose,
    Dialog,
    Tabs,
    Accordion,
  },
  data() {
    return {
      isDialogOpen: false,
      // TODO: replace placeholder data
      tabs: [
        {
          id: '18months',
          label: '18 months',
          content: `Purchase amount $${this.productPrice}`,
        },
        {
          id: '24months',
          label: '24 months',
          content: 'Placeholder text 2',
        },
      ],
      terms: `*Approved applicants only, fees, terms, conditions and minimum monthly payment [and minimum finance amount $<XX>][AU LEGAL NOTE: only include if a minimum finance amount applies] apply, including a $99 Annual Fee charged on first debit to your humm90 Account and annually thereafter; which attracts interest (charged at the humm90 Purchase Rate, currently 23.99% p.a) from the date charged unless fully paid within Interest Free Period and the Interest Free Criteria are met. Indicative monthly payment excl the Annual Fee and assumes no additional purchases, cash advances or other fees and no interest applies. 

Indicative monthly payment is a minimum monthly repayment (MMP) of the greater of $30 or 3% of the outstanding balance for the first month, as the first month’s MMP is greater than the Transaction amount divided by the Interest Free Period. The MMP decreases each month as the Eligible Unpaid Balance decreases, therefore the purchase price of the Transaction will not be repaid within the Interest Free Period if you only pay the contractual MMP over the entire Interest Free Period.  Credit provided by humm Cards Pty Ltd ABN 31 099 651 877 Australian Credit Licence number 247415.

^ Indicative repayments (Transaction amount divided by Interest Free Period) are an estimate only, which excl $99 Annual Fee, and assumes no additional purchases, cash advances or other fees or charges. Interest Free Period available when indicative monthly repayments are made by each statement period due date, resulting in full repayment of purchase amount within the Interest Free Period. `,
    }
  },
})
</script>

<style scoped lang="scss">
.widget {
  font-family: var(--font-base);
  background-color: var(--color-1);
  color: var(--color-1-contrast);
  padding: 8px 16px;
  max-width: 430px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: bold;
    font-size: 12px;
    margin: 0;
  }

  &__title + &__subtitle {
    margin-top: 2px;
  }
}
</style>
