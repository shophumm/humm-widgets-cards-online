<template>
  <p>
    <b>{{ title }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateFirstLetterToUpperCase } from 'src/utils/utils'

export default defineComponent({
  name: 'TitleFarmers',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: '',
    }
  },
  mounted() {
    this.title = updateFirstLetterToUpperCase(this.text)
  },
})
</script>
