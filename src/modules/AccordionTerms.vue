<template>
  <Accordion :id="id" :title="title" :content="generateTerms" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Accordion from 'src/components/accordion/Accordion.vue'

export default defineComponent({
  name: 'AccordionTerms',
  components: {
    Accordion,
  },
  props: {
    id: {
      type: String,
      default: 'widget-terms',
    },
    title: {
      type: String,
      required: true,
    },
    termsTemplate: {
      type: String,
      required: true,
    },
    termsValues: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      termsContent: '',
    }
  },
  computed: {
    generateTerms(): string {
      const template = window.handlebarsForHummWidget.compile(
        this.termsTemplate
      )
      return template(this.termsValues)
    },
  },
})
</script>

<style scoped lang="scss"></style>
