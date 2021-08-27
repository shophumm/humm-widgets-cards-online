<template>
  <div class="widget">
    <div class="widget__content">
      <div v-if="lang === 'au'" class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
      <div v-if="lang === 'nz'" class="widget__iconcard">
        <IconCard>
          <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
        </IconCard>
        <IconCard>
          <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
        </IconCard>
      </div>
      <div class="widget__container">
        <div class="widget__text">
          <p class="widget__title">{{ title }}</p>
          <span class="widget__subtitle">{{ subtitle }}</span>
        </div>
        <Button button-color="var(--color-2)" @click="isDialogOpen = true">
          {{ buttonPrimaryLabel }}
        </Button>
      </div>
    </div>
    <div class="widget__close">
      <ButtonClose icon-opacity="1" fill="var(--color-1-contrast)">
        {{ buttonCloseLabel }}
      </ButtonClose>
    </div>
  </div>

  <Dialog
    v-if="isDialogOpen"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #body>
      <Tabs :tabs="tabs" />
      <Accordion id="widget-terms" :content="terms">
        Terms & Conditions
      </Accordion>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import IconCard from 'src/components/icons/IconCard.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import Dialog from 'src/components/dialog/Dialog.vue'
import Tabs from 'src/components/tabs/Tabs.vue'
import Accordion from 'src/components/accordion/Accordion.vue'

export default defineComponent({
  name: 'WidgetMainSmall',
  components: {
    IconHumm90Bird,
    IconCard,
    Button,
    ButtonClose,
    Dialog,
    Tabs,
    Accordion,
  },
  props: {
    title: String,
    subtitle: String,
    buttonPrimaryLabel: String,
    buttonCloseLabel: String,
    productPrice: Number,
    lang: String,
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
  padding: 10px 8px;
  border-radius: var(--radius-2);
  position: relative;

  @media (min-width: 430px) {
    display: flex;
    padding: 5px 8px;
    max-width: 414px;
    min-height: 37px;
  }

  &__content {
    display: flex;
    width: 100%;
  }

  &__container {
    display: block;
    padding: 0 9px;
    margin-left: 75px;
    margin-right: 20px;

    @media (min-width: 430px) {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 14px;
    font-weight: 200;
    letter-spacing: -0.03em;
    margin: 0;
    text-transform: uppercase;
  }

  &__title + &__subtitle {
    font-size: 12px;
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 13px;
    margin-top: 2px;
  }

  &__iconbird {
    position: absolute;
    top: 10px;
    left: 8px;

    @media (min-width: 430px) {
      top: 15px;
    }
  }

  &__iconcard {
    display: flex;
    position: absolute;
    top: 10px;
    left: 8px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;

    @media (min-width: 430px) {
      top: 14px;
    }
  }
}
</style>
