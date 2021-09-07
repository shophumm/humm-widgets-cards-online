<template>
  <p>
    {{ lightText + ' ' }} <b>{{ boldText }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
      lightText: '',
      boldText: '',
    }
  },
  mounted() {
    this.lightText = this.text?.replace(/60 months interest-free\./i, '')
    this.boldText = this.text?.replace(/up to /i, '')
  },
})
</script>
