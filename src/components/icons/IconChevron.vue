<template>
  <svg width="8" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M.5 1.5L4 5.25 7.5 1.5 6.8.75l-2.8 3-2.8-3-.7.75z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconChevron',
  props: {
    fill: {
      type: String,
      default: '#fff',
    },
  },
})
</script>
