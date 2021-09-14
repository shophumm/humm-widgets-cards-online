<template>
  <div class="cards">
    <CardsList>
      <slot />
    </CardsList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardsList from 'src/modules/CardsList.vue'

export default defineComponent({
  name: 'CardsLogo',
  components: {
    CardsList,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/widget.scss';

@import 'src/styles/cards.scss';
</style>
