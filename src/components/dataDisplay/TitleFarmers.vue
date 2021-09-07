<template>
  <p>
    <b>{{ text }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleFarmers',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
