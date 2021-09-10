<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <div class="widget__hummgroup">
        <IconHummGroup fill="var(--color-1-contrast)" />
      </div>
      <div class="widget__container">
        <div class="widget__text">
          <p class="widget__title">
            3 Years. <strong>First 12 Months Interest-Free</strong>
          </p>
          <span class="widget__subtitle">
            Indicative Payments. Ts&Cs Apply.
          </span>
        </div>
        <Button button-color="var(--color-2)" @click="isDialogOpen = true">
          Explore
        </Button>
      </div>
      <div class="widget__close">
        <ButtonClose
          icon-opacity="1"
          fill="var(--color-1-contrast)"
          @click="closeWidget"
        >
          Close
        </ButtonClose>
      </div>
    </div>
  </div>

  <DialogOverlay
    id="widget-dialog"
    :is-dialog-open="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #heading>Monthly payments</template>
    <template #tabs>
      <Tabs :tabs="tabs">
        <template #default="{ activeTabId }">
          <Tab tab-id="12months" :active-tab-id="activeTabId">
            <DataList :contents="tabsContents('12months')" />
          </Tab>
          <Tab tab-id="18months" :active-tab-id="activeTabId">
            <DataList :contents="tabsContents('18months')" />
          </Tab>
        </template>
      </Tabs>
    </template>
    <template #terms>
      <Accordion id="widget-terms" :content="terms">
        Terms & Conditions
      </Accordion>
    </template>
    <template #applyNow>
      <div>
        <!-- TODO: remove parent <div> -->
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
import IconHummGroup from 'src/components/icons/IconHummGroup.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import Tabs from 'src/components/tabs/Tabs.vue'
import Tab from 'src/components/tabs/Tab.vue'
import DataList from 'src/components/tabs/DataList.vue'
import Accordion from 'src/components/accordion/Accordion.vue'
import ThemeEnum from 'src/models/enums/ThemeEnum'
import fetchData from 'src/utils/apiUtils'
import { updateFirstLetterToUpperCase } from 'src/utils/utils'
import DialogOverlay from 'src/modules/DialogOverlay.vue'

export default defineComponent({
  name: 'WidgetMainHummGroup',
  components: {
    IconHummGroup,
    Card,
    Button,
    ButtonClose,
    Tabs,
    Tab,
    DataList,
    Accordion,
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
  methods: {
    closeWidget() {
      this.isWidgetOpen = false
    },
    tabsContents(id: string): Record<string, string>[] | undefined {
      return this.tabs.find(item => item.id === id)?.contents
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
