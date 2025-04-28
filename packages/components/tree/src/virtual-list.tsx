import { createNameSpace } from "@dnhy/utils/create.js";
import { defineComponent, PropType } from "vue";
import { TreeNode } from "./tree";

export default defineComponent({
  name: "virtualList",
  props: {
    items: {
      type: Array as PropType<TreeNode[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const bem = createNameSpace("vl");

    return () => (
      <div className={bem.b()}>
        <div className={bem.e("scrroll-bar")}></div>
        <div className={bem.e("scroll-list")}>
          {props.items.map((node) => slots.default!({ node }))}
        </div>
      </div>
    );
  },
});
