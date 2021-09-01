<template>
  <div class="theme" :data-lang="lang" :data-theme="theme">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LanguageCodeEnum from 'src/models/LanguageCodeEnum'
import ThemeEnum from 'src/models/ThemeEnum'

export default defineComponent({
  name: 'Theme',
  props: {
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
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
  --radius-1: 4px;
  --radius-2: 10px;
  --radius-3: 5px;

  // Default theme
  --color-0: #002555;
  --color-1: #002555;
  --color-1-contrast: #fff;
  --color-2: #ecb250; // Web / Tile / Button / Secondary
  --color-3: #8c8c8c; // Mid grey
  --color-4: #e7e7e7;

  &[data-lang='nz'],
  &[data-theme='qmc'] {
    --color-0: #000000;
    --color-1: #ffffff;
    --color-1-contrast: #002555;
    --color-2: #e92162; // Web / Tile / Button / Secondary
  }

  &[data-theme='farmers'] {
    --color-0: #000000;
    --color-1: #ffffff;
    --color-1-contrast: #000000;
    --color-2: #732d81; // Web / Tile / Button / Secondary
  }
}
</style>
