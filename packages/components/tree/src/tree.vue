<template>
  <div :class="bem.b()">
    <virtualList :items="flattenTree">
      <template #default="{ node }">
        <treeNode :node="node" :expanded="isExpanded(node)" :key="node.key" :loadingKeys="loadingKeysRef"
          :selectedKeys="selectedKeysModel" @select="handleSelect" @toggle="toggleExpand(node)" />
      </template>
    </virtualList>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  provide,
  reactive,
  ref,
  useSlots,
  watch,
  defineSlots,
} from "vue";
import {
  type key,
  treeInjectKey,
  type TreeNode,
  type TreeOption,
  treeProps,
} from "./tree";
import treeNode from "./treeNode.vue";
import { createNameSpace } from "@dnhy/utils/create";
import virtualList from "./virtual-list";

defineOptions({
  name: "z-tree",
});

const bem = createNameSpace("tree");

const props = defineProps(treeProps);
const tree = ref<TreeNode[]>([]);

provide(treeInjectKey, { slots: useSlots() });
console.log("useSlots() :", useSlots());

function createOptions(key, label: string, children: string) {
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

// TODO 换定义value和update:selected-keys尝试
// 需要定义一个ref作为局部变量，接收props的值（对象需要深浅拷贝），并使用watch保证更新，这样局部才能更新这个传入的value属性；
// 如果父组件需要同步更新，调用update:selected-keys更新父组件的值
const selectedKeysModel = defineModel<key[]>("selected-keys");

function handleSelect(node: TreeNode) {
  // 虽然由于是model的CustomRefImpl类型，可以直接修改，但一般都拷贝一份props出来操作，最后调update方法修改,避免父子组件频繁更新
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
