<template>
  <p>{{ upperCaseText }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleAu',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      upperCaseText: '',
    }
  },
  mounted() {
    this.upperCaseText = this.text.toUpperCase()
  },
})
</script>
