<template>
  <div class="theme" :data-theme="lang">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LanguageCodeEnum } from 'src/models/LanguageCodeEnum'

export default defineComponent({
  name: 'Theme',
  props: {
    lang: String as () => LanguageCodeEnum,
  },
})
</script>

<style scoped lang="scss">
@import 'https://use.typekit.net/plq2clw.css';

.theme {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // Shared properties
  --font-base: 'proxima nova', sans-serif;

  // Default theme
  --color-1: #002555;
  --color-1-contrast: #fff;
  --color-2: #ecb250; // Web / Tile / Button / Secondary
  --color-3: #8c8c8c; // Mid grey
  --color-4: #f5f6f7;

  &[data-theme='nz'],
  &[data-theme='qmc'] {
    --color-1: #ffffff;
    --color-1-contrast: #002555;
    --color-2: #e92162; // Web / Tile / Button / Secondary
    --color-3: #8c8c8c; // Mid grey
    --color-4: #f5f6f7;
  }
}
</style>
