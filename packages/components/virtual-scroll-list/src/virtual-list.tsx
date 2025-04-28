import { defineComponent, onBeforeMount, ref } from "vue";
import { RangeOptions, updateRangeType, virtualProps } from "./prop";
import { initVirtual } from "./virtual";
import VirtualItem from "./virtual-item";

export default defineComponent({
  name: "ZVirtualScrollList",
  props: virtualProps,
  setup(props) {
    const range = ref<RangeOptions | null>();
    const updateRange: updateRangeType = (newRange) => {
      range.value = newRange;
    };
    const getUniqueIdFromDataSources = (): string[] => {
      const { dataSources, dataKey } = props;
      return dataSources.map((dataSource: any) => dataSource[dataKey as any]);
    };

    const getRenderComponent = () => {
      const { dataSources, dataComponent, dataKey } = props;
      const { start, end } = range.value!;
      const slots: any[] = [];
      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index];
        const uniqueKey = (dataSource as any)[dataKey as any];
        if (dataSource) {
          slots.push(
            <VirtualItem
              dataIndex={index}
              uniqueKey={uniqueKey}
              source={dataSource}
              component={dataComponent}
              onItemResize={onItemResize}
            ></VirtualItem>,
          );
        }
      }

      return slots;
    };
    let virtual: ReturnType<typeof initVirtual>;
    const installVirtual = () => {
      virtual = initVirtual(
        {
          keeps: props.keeps,
          buffer: Math.round(props.keeps / 3),
          estimizeSize: props.estimateSize,
          uniqueIds: getUniqueIdFromDataSources(),
        },
        updateRange,
      );
    };

    onBeforeMount(() => {
      installVirtual();
    });

    const onItemResize = (id: number | string, size: number) => {
      virtual.saveSize(id, size);
    };

    const root = ref<HTMLElement | null>();
    const onscroll = () => {
      if (root.value) {
        const offset = root.value.scrollTop;
        virtual.handleScroll(offset);
      }
    };

    return () => {
      const { padFront, padBehind } = range.value!;
      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px 0`,
      };

      return (
        <div onScroll={onscroll} ref={root}>
          <div style={paddingStyle}>{getRenderComponent()}</div>
        </div>
      );
    };
  },
});
