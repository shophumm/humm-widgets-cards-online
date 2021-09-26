<template>
  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.575 11.235a.948.948 0 11-1.34 1.342l-2.236-2.235-2.235 2.235a.949.949 0 11-1.341-1.342L7.658 9 5.423 6.765a.95.95 0 111.341-1.343l2.235 2.234 2.235-2.234a.95.95 0 111.341 1.343L10.342 9l2.233 2.235zM9 0C4.03 0 0 4.03 0 9s4.03 9 9 9A9 9 0 009 0z"
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
