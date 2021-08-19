<template>
  <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.38 7.49a.63.63 0 11-.89.9l-1.5-1.5-1.48 1.5a.63.63 0 11-.9-.9L5.12 6 3.6 4.51a.63.63 0 11.9-.9L6 5.11l1.49-1.5a.63.63 0 11.9.9L6.88 6l1.5 1.49zM6 0a6 6 0 100 12A6 6 0 006 0z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconClose',
  props: {
    fill: {
      type: String,
      default: '#fff',
    },
  },
})
</script>
