import { defineComponent, onMounted, onUpdated, ref } from "vue";
import { virtualItemProps } from "./prop";

export default defineComponent({
  name: "virtual-item",
  props: virtualItemProps,
  emits: ["itemResize"],
  setup(props, { emit }) {
    const root = ref<HTMLElement | null>();
    const { uniqueKey } = props;

    const dispatchEvent = () => {
      emit("itemResize", uniqueKey, root.value?.offsetHeight);
    };
    onMounted(dispatchEvent);
    onUpdated(dispatchEvent);
    return () => {
      const { uniqueKey, component: Comp, source } = props;

      return (
        Comp && (
          <div key={uniqueKey} ref={root}>
            <Comp source={source} />
          </div>
        )
      );
    };
  },
});
