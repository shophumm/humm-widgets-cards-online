<template>
  <Accordion :id="id" :title="title" :content="termsTemplate" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Accordion from 'src/components/accordion/Accordion.vue'
// import Handlebars from 'handlebars'

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
  created() {
    console.log(this.termsValues)
    console.log(this.termsTemplate)
    // const template = Handlebars.compile(this.termsTemplate)
    // console.log(template(this.productData))
  },
})
</script>

<style scoped lang="scss"></style>
