<template>
  <p>{{ upperCaseTitle }}</p>
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
      upperCaseTitle: '',
    }
  },
  mounted() {
    this.upperCaseTitle = this.text.toUpperCase()
  },
})
</script>
