<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { FormContextKey, formProps } from "./form";
import type { FormItemContext } from "./formItem";

defineOptions({
  name: "z-form",
});
const props = defineProps(formProps);
console.log("props :", props);

const fileds: FormItemContext[] = [];

const addField = (context: FormItemContext) => {
  fileds.push(context);
};

const context = {
  ...props,
  addField,
};

provide(FormContextKey, context);
</script>

<style lang="scss" scoped></style>
