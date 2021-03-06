<template>
  <div class="theme" :data-lang="lang" :data-theme="theme" :data-dark="isDark">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LanguageCodeEnum from 'src/models/enums/LanguageCodeEnum'
import ThemeEnum from 'src/models/enums/ThemeEnum'

export default defineComponent({
  name: 'Theme',
  props: {
    lang: String as () => LanguageCodeEnum,
    theme: String as () => ThemeEnum,
    isDark: Boolean,
  },
})
</script>

<style lang="scss">
@import 'src/styles/reset.scss';
</style>

<style scoped lang="scss">
@import 'https://use.typekit.net/plq2clw.css';

.theme {
  // Shared properties
  --font-base: 'proxima-nova', sans-serif;
  --radius-1: 4px;
  --radius-2: 10px;
  --radius-3: 5px;

  // Default theme
  --color-0: #002555;
  --color-1: #002555;
  --color-1-contrast: #002555;
  --color-2: #ecb250; // Web / Tile / Button / Secondary
  --color-3: #002555; // Main Widget Button
  --color-4: #8c8c8c; // Mid grey
  --color-5: #e7e7e7;
  --color-6: #fff;
  --bg-1: #ffffff; // Widget background
  --bg-2: #f7f7f7; // Dialog background

  &[data-lang='au'][data-dark='true'] {
    --color-0: #002555;
    --color-1: #002555;
    --color-1-contrast: #fff;
    --color-2: #ecb250; // Web / Tile / Button / Secondary
    --color-3: #ecb250; // Main Widget Button
    --bg-1: #002555; // Widget background
  }

  &[data-lang='nz'],
  &[data-theme='qmc'] {
    --color-0: #000000;
    --color-1: #e92162;
    --color-1-contrast: #000000;
    --color-2: #e92162; // Web / Tile / Button / Secondary
    --color-3: #192f6c; // Main Widget Button
    --bg-1: #ffffff; // Widget background
  }

  &[data-lang='nz'][data-dark='true'],
  &[data-theme='qmc'][data-dark='true'] {
    --color-0: #000000;
    --color-1: #e92162;
    --color-1-contrast: #ffffff;
    --color-2: #e92162; // Web / Tile / Button / Secondary
    --color-3: #ffffff; // Main Widget Button
    --bg-1: #e92162; // Widget background
  }

  &[data-theme='farmers'] {
    --color-0: #000000;
    --color-1: #732d81;
    --color-1-contrast: #000000;
    --color-2: #573a90; // Web / Tile / Button / Secondary
    --color-3: #732d81; // Main Widget Button
    --bg-1: #ffffff; // Widget background
  }

  &[data-theme='farmers'][data-dark='true'] {
    --color-0: #000000;
    --color-1: #ffffff;
    --color-1-contrast: #ffffff;
    --color-2: #573a90; // Web / Tile / Button / Secondary
    --color-3: #ffffff; // Main Widget Button
    --bg-1: linear-gradient(
      90deg,
      #b83990 18.24%,
      #573a90 87.88%
    ); // Widget background
  }
}
</style>
