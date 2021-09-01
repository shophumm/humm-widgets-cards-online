<template>
  <div :class="'card card--' + size">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SizeEnum from 'src/models/enums/SizeEnum'
import type { PropType } from 'vue'
import type { Sizes } from 'src/models/enums/SizeEnum'

export default defineComponent({
  name: 'Card',
  props: {
    size: {
      type: String as PropType<Sizes>,
      default: SizeEnum.Auto,
    },
  },
})
</script>

<style scoped lang="scss">
.card {
  margin-left: 2px;
  margin-right: 2px;

  &--auto {
    width: 34px;

    @media (min-width: 430px) {
      width: 35px;
    }
  }

  &--sm {
    width: 35px;
  }

  &--md {
    width: 40px;
  }

  &--lg {
    margin-left: 3px;
    margin-right: 3px;
    width: 55px;
  }

  ::v-slotted(img, svg) {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
