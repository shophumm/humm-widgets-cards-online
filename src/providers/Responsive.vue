<template v-slot:default="slotProps">
  <div ref="box" class="box">
    <slot :isSizeLarge="isSizeLarge"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Responsive',
  emits: ['resize'],
  data() {
    return {
      width: 0,
      isSizeLarge: false,
      observer: {} as ResizeObserver,
    }
  },
  mounted() {
    // initialize the observer on mount
    this.initObserver()
  },
  beforeUnmount() {
    if (this.observer) this.observer?.unobserve(this.$refs.box as Element)
  },
  methods: {
    onResize() {
      const box = this.$refs.box as Element
      const width = box.clientWidth
      this.width = width

      if (width > 410) {
        this.isSizeLarge = true
      } else {
        this.isSizeLarge = false
      }

      // Optionally, emit event with dimensions
      this.$emit('resize', { width })
    },
    initObserver() {
      const observer = new ResizeObserver(this.onResize)
      observer.observe(this.$refs.box as Element)
      this.observer = observer
    },
  },
})
</script>
