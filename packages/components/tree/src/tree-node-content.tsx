import { defineComponent, inject, toRefs } from "vue";
import { treeInjectKey, treeNodeContentProps } from "./tree.js";

export default defineComponent({
  name: "treeNodeContent",
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey);

    const { node } = toRefs(props);

    return () => {
      return treeContext?.slots?.default ? (
        treeContext?.slots?.default({ node: node.value })
      ) : (
        <div>{node.value?.label}</div>
      );
    };
  },
});
