<template v-slot:default="slotProps">
  <div ref="box" class="box">
    <slot :isSizeLarge="isSizeLarge"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Responsive',
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
      this.isSizeLarge = box.clientWidth > 410
    },
    initObserver() {
      const observer = new ResizeObserver(this.onResize)
      observer.observe(this.$refs.box as Element)
      this.observer = observer
    },
  },
})
</script>
