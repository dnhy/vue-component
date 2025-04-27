import type { DefineComponent, ExtractPropTypes, PropType } from "vue"

export type RangeOptions = {
    start: number,
    end: number,
    padFront: number,
    padBehind: number,
}

export type VirtualOptions = {
    keeps: number,
    buffer: number,
    estimizeSize: number,
    uniqueIds: string[]
}

export type updateRangeType = (range: RangeOptions) => void

export const virtualProps = {
    dataSources: {
        type: Array,
        required: true,
        default: () => [],
    },
    dataKey: {
        type: String,
        required: true
    },
    // 一次渲染多少个
    keeps: {
        type: Number,
        default: 30
    },
    // 预估高度
    estimateSize: {
        type: Number,
        default: 80
    },
    dataComponent: {
        type: Object as PropType<DefineComponent<{}, {}, any>>,
        required: true
    }
} as const;

export type VirtualProps = ExtractPropTypes<typeof virtualProps>;

export const virtualItemProps = {
    uniqueKey: {
        type: [String, Number] as PropType<string | number>
    },
    source: {
        type: Object,
        required: true
    },
    component: {
        type: [Object, Function] as PropType<DefineComponent<{}, {}, any>>
    }
} as const;

export type VirtualItemProps = ExtractPropTypes<typeof virtualItemProps>;