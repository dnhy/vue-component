<template>
  <router-view></router-view>

  <!-- <z-icon :color="'black'" size="30">
    <AddCircleOutline />
  </z-icon>
  <z-icon :color="'red'" size="50">
    <AddCircleOutline />
  </z-icon> -->
  <!-- <z-tree
    :data="data"
    lable-field="xx"
    key-field="prop"
    children-field="children"
    :defaultExpandedKeys="['41', '4130']"
  ></z-tree> -->
  {{ value }}
  <z-tree
    :data="data"
    :on-load="handleLoad"
    v-model:selected-keys="value"
    lable-field="xx"
    key-field="prop"
    selectable
    multiple
  >
    <template #="{ node }">
      {{ node?.key + "!!!!" }} -
      {{ node?.label }}
    </template>
  </z-tree>
</template>

<script setup lang="ts">
import type { TreeOption } from "@dnhy/components/tree";
import { AddCircleOutline } from "@vicons/ionicons5";
import { ref } from "vue";
import type { key } from "@dnhy/components/tree";

function createData(level = 4, parentKey = ""): any {
  if (!level) return [];
  const arr = new Array(16 - level).fill(0);
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx;
    return {
      xx: createLabel(level), // 显示的内容
      prop: key, // 为了唯一性
      children: createData(level - 1, key), // 孩子
    };
  });
}
function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

const data = ref(createData());
const value = ref<key[]>([]);

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false, // 这里isLeaf 为false 表示点击的时候动态的加载子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false,
//     },
//   ];
// }
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return "Out of Tao, One is born";
  if (currentLabel === "Out of Tao, One is born") return "Out of One, Two";
  if (currentLabel === "Out of One, Two") return "Out of Two, Three";
  if (currentLabel === "Out of Two, Three") {
    return "Out of Three, the created universe";
  }
  if (currentLabel === "Out of Three, the created universe") {
    return "Out of Tao, One is born";
  }
  return "";
}

function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}
</script>

<style lang="scss" scoped></style>
