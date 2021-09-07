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
    this.lightTitle = this.title?.replace(/60 months interest-free\./i, '')
    this.boldTitle = this.title?.replace(/up to /i, '')
  },
})
</script>
