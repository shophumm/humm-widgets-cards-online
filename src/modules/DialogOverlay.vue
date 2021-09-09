<template>
  <Dialog
    v-if="isDialogOpen"
    id="widget-dialog"
    :button-close-label="buttonCloseLabel"
    @toggle-dialog="toggleDialog"
  >
    <template #header> <slot name="heading"></slot> </template>
    <template #body>
      <slot name="tabs"></slot>
      <slot name="terms"></slot>
      <slot name="applyNow"></slot>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dialog from 'src/components/dialog/Dialog.vue'

export default defineComponent({
  name: 'DialogOverlay',
  components: {
    Dialog,
  },
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-dialog'],
  methods: {
    toggleDialog() {
      this.$emit('toggle-dialog')
    },
  },
})
</script>
