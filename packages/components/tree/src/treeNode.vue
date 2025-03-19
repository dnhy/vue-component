<template>
  <div :class="[bem.b(), bem.is('select', isSelected)]">
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: 16 * node.level + 'px' }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded },
          bem.is('leaf', node.isLeaf),
        ]"
        @click="$emit('toggle', node)"
      >
        <zIcon size="20">
          <Loading v-if="isLoading" />
          <Switcher v-else />
        </zIcon>
      </span>
      <span :class="bem.e('label')" @click="handleClick">
        <treeNodeContent :node="node" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switcher from "../../internal-icon/Switcher";
import Loading from "../../internal-icon/Loading";
import { zIcon } from "../../icon";
import { treeInjectKey, treeNodeEmits, treeNodeProps } from "./tree";
import { createNameSpace } from "@dnhy/utils/create";
import { computed, inject } from "vue";
import treeNodeContent from "./tree-node-content";

const props = defineProps(treeNodeProps);

const emit = defineEmits(treeNodeEmits);

const bem = createNameSpace("tree-node");

const treeContext = inject(treeInjectKey);
console.log("treeContext :", treeContext?.slots.default!({ node: props.node }));

const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key);
});

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.key);
});

function handleClick() {
  emit("select", props.node);
}
</script>

<style lang="scss" scoped></style>
