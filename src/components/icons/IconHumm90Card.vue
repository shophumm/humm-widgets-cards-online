<template>
  <img
    src="../../assets/Humm90_Card_Logo.png"
    alt="Humm 90 card with yellow border"
    class="humm90card"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconHumm90Card',
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

.humm90card {
  max-width: 30px;
  max-height: 28px;
}
</style>
