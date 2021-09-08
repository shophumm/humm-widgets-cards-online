<template>
  <p>
    {{ lightTitle + ' ' }} <b>{{ boldTitle }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateFirstLetterToUpperCase } from 'src/utils/utils'

export default defineComponent({
  name: 'TitleQmc',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: updateFirstLetterToUpperCase(this.text),
      lightTitle: '',
      boldTitle: '',
    }
  },
  mounted() {
    this.lightTitle = this.title
      ?.toLowerCase()
      .includes('first 12 months interest free.')
      ? this.title.replace(/first 12 months interest free\./i, '')
      : ''
    console.log(this.lightTitle)
    this.boldTitle = this.title?.toLowerCase().includes('3 years.')
      ? this.title.replace(/3 years./i, '')
      : ''
    console.log(this.boldTitle)
  },
})
</script>
