import { ExtractPropTypes, PropType } from "vue";
import { baseProps, uploadProps, UploadRawFile } from "./upload";
const NOOP = () => {};

export const uploadContentProps = {
  ...baseProps,
  beforeUpload: uploadProps["beforeUpload"],
  onRemove: {
    type: Function as PropType<(file: UploadRawFile) => void>,
    default: NOOP,
  },
  onStart: {
    type: Function as PropType<(file: UploadRawFile) => void>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (e: uploadProgressEvent, rawFile: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<(err: any, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<(res: any, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
} as const;

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;

export type uploadProgressEvent = ProgressEvent & { percantage: number };

export interface uploadOptions {
  name: string;
  file: UploadRawFile;
  method: string;
  headers: object;
  data: object;
  action: string;
  onProgress: (e: uploadProgressEvent) => void;
  onError: (err: any) => void;
  onSuccess: (res: any) => void;
}
