<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconCard',
})
</script>

<style scoped lang="scss">
.card {
  width: 34px;
  margin: 2px;

  ::v-slotted(img, svg) {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
</style>
