<template>
  <dl class="list">
    <div v-for="content in contents" :key="content.name" class="list__item">
      <dt class="list__name">{{ content.name }}</dt>
      <dd class="list__value">{{ content.value }}</dd>
    </div>
  </dl>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { TabItemProps } from 'src/models/Tabs'

export default defineComponent({
  name: 'DataList',
  props: {
    contents: {
      type: Array as () => TabItemProps[],
      required: true,
    },
  },
  data() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.list {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin: 0;

  &__item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
}
</style>
