<template>
  <div
    @dragover.prevent="onDragover"
    @dragleave.prevent="isOver = false"
    @drop.prevent="onDrop"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOver = ref(false);
const emit = defineEmits();
const onDrop = (e: DragEvent) => {
  e.stopPropagation();
  emit("file", Array.from(e.dataTransfer!.files));
};

const onDragover = (e: DragEvent) => {
  isOver.value = true;
};
</script>

<style lang="scss" scoped></style>
