<template>
  <div v-if="isWidgetOpen" class="widget">
    <div class="widget__content">
      <div v-if="lang === 'au'" class="widget__iconbird">
        <IconHumm90Bird fill="var(--color-1-contrast)" />
      </div>
      <!-- TODO: render cards dynamically -->
      <div v-if="lang === 'nz'" class="cards">
        <div class="cards__products">
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
          <Card>
            <img src="../assets/images/humm90Card.png" alt="Humm90 card" />
          </Card>
        </div>
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
      <div class="widget__close">
        <ButtonClose
          icon-opacity="1"
          fill="var(--color-1-contrast)"
          @click="closeWidget()"
        >
          {{ buttonCloseLabel }}
        </ButtonClose>
      </div>
    </div>
  </div>

  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="isDialogOpen = false"
  >
    <template #body>
      <Tabs :tabs="tabs" />
      <Accordion id="widget-terms" :content="terms">
        Terms & Conditions
      </Accordion>
      <!-- TODO: replace placeholder data -->
      <!-- TODO: view logic for displaying card options -->
      <div v-if="theme === 'qmc'">
        <div class="cards cards--full cards--border">
          <p class="cards__title">Learn more about our credit card options.</p>
          <div class="cards__products">
            <Card v-for="card in cards" :key="card.id" :size="card.size">
              <img src="../assets/images/humm90Card.png" :alt="card.alt" />
            </Card>
          </div>
          <!-- TODO: link with button styling -->
          <Button size="lg" button-color="var(--color-2)">Apply now</Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import Card from 'src/components/dataDisplay/Card.vue'
import Button from 'src/components/buttons/Button.vue'
import ButtonClose from 'src/components/buttons/ButtonClose.vue'
import Dialog from 'src/components/dialog/Dialog.vue'
import Tabs from 'src/components/tabs/Tabs.vue'
import Accordion from 'src/components/accordion/Accordion.vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'

export default defineComponent({
  name: 'WidgetMainSmall',
  components: {
    IconHumm90Bird,
    Card,
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
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
  },
  data() {
    return {
      isWidgetOpen: true,
      isDialogOpen: false,
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
  methods: {
    closeWidget() {
      this.isWidgetOpen = false
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/cards.scss';

.widget {
  font-family: var(--font-base);
  background-color: var(--color-1);
  color: var(--color-1-contrast);
  padding: 10px;
  border-radius: var(--radius-2);
  position: relative;
  filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.1));

  @media (min-width: 430px) {
    display: flex;
    max-width: 414px;
    min-height: 37px;
  }

  &__content {
    display: flex;
    width: 100%;
  }

  &__container {
    display: block;
    margin-left: 10px;
    margin-right: 20px;

    @media (min-width: 430px) {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin-right: 12px;
    }

    .button {
      margin-top: 5px;

      @media (min-width: 430px) {
        margin-top: 0;
      }
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
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
    margin: 10px 0 0 8px;

    @media (min-width: 430px) {
      margin: 15px 0 0 8px;
    }
  }

  &__close {
    display: flex;
    margin-left: auto;

    @media (min-width: 430px) {
      align-items: center;
    }
  }
}
</style>
