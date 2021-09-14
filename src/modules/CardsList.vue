<template>
  <div class="cards__products">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardsListing',
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

@import 'src/styles/cards.scss';
</style>
