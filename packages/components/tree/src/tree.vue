<template>
  <div :class="bem.b()">
    <treeNode
      v-for="item in flattenTree"
      :node="item"
      :expanded="isExpanded(item)"
      :key="item.key"
      :loadingKeys="loadingKeysRef"
      :selectedKeys="selectedKeysModel"
      @select="handleSelect"
      @toggle="toggleExpand(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { type key, type TreeNode, type TreeOption, treeProps } from "./tree";
import treeNode from "./treeNode.vue";
import { createNameSpace } from "@dnhy/utils/create";

defineOptions({
  name: "z-tree",
});

const bem = createNameSpace("tree");

const props = defineProps(treeProps);
const tree = ref<TreeNode[]>([]);

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string;
    },
    getLabel(node: TreeOption) {
      return node[label] as string;
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[];
    },
  };
}

const treeOptions = createOptions(
  props.keyField,
  props.lableField,
  props.childrenField
);

function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map((node: TreeOption) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        level: parent ? parent.level + 1 : 0,
        rawNode: node,
        // 自带isLeaf以自带的为准，不自带往后走再判断children
        isLeaf: node.isLeaf ?? children.length === 0,
      };
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode);
      }

      return treeNode;
    });
  }
  const result: TreeNode[] = traversal(data, parent);

  return result;
}

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
  },
  {
    immediate: true,
  }
);
const expandkeysSet = ref(new Set(props.defaultExpandedKeys));

// 使用树的先序遍历(深度优先)，拍平数组
const flattenTree = computed(() => {
  const stack: TreeNode[] = [];
  const flattenTreeNodes: TreeNode[] = [];
  const treeNodes = tree.value;
  for (let i = treeNodes.length - 1; i >= 0; i--) {
    stack.push(treeNodes[i]);
  }

  while (stack.length) {
    const node = stack.pop();

    if (!node) continue;
    flattenTreeNodes.push(node);
    if (expandkeysSet.value.has(node.key)) {
      if (node.children.length > 0) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }
  }

  return flattenTreeNodes;
});

function isExpanded(node: TreeNode) {
  return expandkeysSet.value.has(node.key);
}

function expand(node: TreeNode) {
  expandkeysSet.value.add(node.key);
  triggerLoading(node);
}

function collapse(node: TreeNode) {
  expandkeysSet.value.delete(node.key);
}

const loadingKeysRef = ref(new Set<key>());
function triggerLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    const loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          node.rawNode.children = children;
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}

function toggleExpand(node: TreeNode) {
  isExpanded(node) && !loadingKeysRef.value.has(node.key)
    ? collapse(node)
    : expand(node);
}

const selectedKeysModel = defineModel<key[]>("selected-keys");

function handleSelect(node: TreeNode) {
  // 拷贝一份，操作完之后赋值，避免反复触发getter
  let keys = Array.from(selectedKeysModel.value!);
  if (!props.selectable) return;

  if (props.multiple) {
    let index = keys.findIndex((k) => k === node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
  } else {
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }

  selectedKeysModel.value = keys;
}
</script>

<style lang="scss" scoped></style>
