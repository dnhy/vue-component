<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNameSpace } from "@dnhy/utils/create";
import { computed } from "vue";
import { iconProps } from "./icon";
defineOptions({
  name: "z-icon",
});
const bem = createNameSpace("icon");

const props = defineProps(iconProps);

const style = computed(() => {
  if (!props.size && !props.color) return {};

  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>

<style lang="scss" scoped></style>
