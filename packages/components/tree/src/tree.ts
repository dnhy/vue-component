import { ExtractPropTypes, PropType } from "vue";

export type key = string | number;

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  isLeaf: boolean;
}

export interface TreeOption {
  label?: key;
  key?: key;
  children?: TreeOption[];
  isLeaf: boolean;
  [key: string]: unknown; //任意接口
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: [],
  },
  lableField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "key",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  defaultExpandedKeys: {
    type: Array as PropType<key[]>,
    default: [],
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<key[]>,
    default: () => [],
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
} as const; //props是仅读的

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  loadingKeys: {
    type: Object as PropType<Set<key>>,
    default: [],
  },
  selectedKeys: {
    type: Array as PropType<key[]>,
    default: () => [],
  },
} as const;

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
};

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
