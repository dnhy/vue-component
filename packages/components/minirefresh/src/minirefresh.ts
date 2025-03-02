import { ExtractPropTypes, PropType } from "vue";

export type DataRequest = (arg0: number, arg1: number) => void;
export const miniProps = {
  url: {
    type: String,
  },
  initPageIndex: {
    type: Number,
  },
  pageSize: {
    type: Number,
  },
  // 请求的数据，为函数时请将数据返回出去
  dataRequest: {
    type: Function as PropType<DataRequest>,
    required: true,
  },
  // 修改数据返回参数
  dataChange: {
    type: Function,
    required: true,
  },
} as const;

export type MiniProps = ExtractPropTypes<typeof miniProps>;
