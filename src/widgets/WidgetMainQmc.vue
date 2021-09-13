<template>
  <div v-if="isWidgetOpen" class="widget">
    <WidgetContent
      @toggle-dialog="isDialogOpen = true"
      @close-widget="isWidgetOpen = false"
    >
      <template #logo>
        <div class="cards">
          <div class="cards__products">
            <Card>
              <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
            </Card>
            <Card>
              <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
            </Card>
          </div>
        </div>
      </template>
      <template #title>
        <p class="widget__title">
          Up To <strong>60 Months Interest-Free</strong>
        </p>
      </template>
      <template #subtitle>
        <span class="widget__subtitle">
          Indicative Payments. Ts&Cs Apply.
        </span>
      </template>
    </WidgetContent>
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
    </template>
  </DialogOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'src/components/dataDisplay/Card.vue'
import Button from 'src/components/buttons/Button.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import fetchData from 'src/utils/apiUtils'
import WidgetContent from 'src/modules/WidgetContent.vue'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainQmc',
  components: {
    Card,
    Button,
    WidgetContent,
    DialogOverlay,
  },
  props: {
    productPrice: Number,
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
