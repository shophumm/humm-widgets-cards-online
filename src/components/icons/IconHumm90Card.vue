<template>
  <div class="logoWrapper">
    <div class="borderHumm90" />
    <img
      srcset="
        ../../assets/Humm90_Card_Small.png,
        ../../assets/Humm90_Card_Medium.png 1.5x,
        ../../assets/Humm90_Card_Large.png  2x
      "
      src="../../assets/Humm90_Card_Medium.png"
      alt="Humm 90 card with yellow border"
      class="humm90card"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconHumm90Card',
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

.logoWrapper {
  position: relative;
  min-width: 35px;
  display: flex;
}

.humm90card {
  position: absolute;
  top: -2px;
  left: 2px;
}

.borderHumm90 {
  position: absolute;
  top: 1px;
  left: 5px;
  border: solid var(--color-2) 1px;
  min-width: 23px;
  height: 23px;
}
</style>
