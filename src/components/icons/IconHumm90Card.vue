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

.logoWrapper {
  min-width: 35px;
}

.humm90card {
  max-width: 30px;
}
</style>
