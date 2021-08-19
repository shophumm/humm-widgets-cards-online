<template>
  <div class="widget">
    <div class="widget__text">
      <p class="widget__title">{{ title }}</p>
      <span class="widget__title">{{ subtitle }}</span>
    </div>
    <Button buttonColor="var(--color-2)" @click="isDialogOpen = true">{{
      buttonPrimaryLabel
    }}</Button>
    <IconHumm90Bird fill="var(--color-1-contrast)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHumm90Bird from 'src/components/icons/IconHumm90Bird.vue'
import Button from 'src/components/buttons/Button.vue'

export default defineComponent({
  name: 'WidgetMainSmall',
  props: {
    title: String,
    subtitle: String,
    buttonPrimaryLabel: String,
  },
  components: {
    IconHumm90Bird,
    Button,
  },
})
</script>

<style scoped lang="scss">
.widget {
  font-family: var(--font-base);
  background-color: var(--color-1);
  color: var(--color-1-contrast);
  padding: 8px 16px;
  max-width: 430px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: bold;
    font-size: 12px;
    margin: 0;
  }

  &__title + &__subtitle {
    margin-top: 2px;
  }
}
</style>
