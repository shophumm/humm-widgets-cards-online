<template>
  <svg width="20" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.6 8.3a.34.34 0 000 .47c.07.05.14.1.22.1a.3.3 0 00.23-.1l8.03-8.3a8.15 8.15 0 01-.33 10.89v5.86H9.4a8.49 8.49 0 01-8.34-8.6c0-.74.09-1.47.25-2.15C1.48 5.53.75 4.03 0 3.03c1.2.15 2.96.04 3.51-.52a8.18 8.18 0 0111.58-.2l.12.2-5.6 5.79zM5.93 5.28c.65 0 1.17-.54 1.17-1.21a1.2 1.2 0 00-1.18-1.22c-.22 0-.42.06-.6.17h.02c.36 0 .64.29.64.66 0 .36-.28.65-.64.65a.63.63 0 01-.58-.4V4.05c0 .16.02.33.09.5.18.43.6.73 1.08.73z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconHummBird',
  props: {
    fill: {
      type: String,
      default: '#fff',
    },
  },
})
</script>
