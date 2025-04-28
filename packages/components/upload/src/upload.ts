import { v4 as uuidv4 } from "uuid";
import type { ExtractPropTypes, PropType } from "vue";
import { uploadProgressEvent } from "./upload-content.js";
const NOOP = () => {};

export interface UploadFile {
  uid?: string;
  name: string;
  url?: string;
  percentage?: number;
  raw?: File;
  size?: number;
  status: string;
}

export type UploadFiles = UploadFile[];

export type UploadRawFile = File & { uid: string };

export const baseProps = {
  FileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [] as const,
  },
  action: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "file",
  },
  accept: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "post",
  },
  headers: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
} as const;

export const uploadProps = {
  ...baseProps,
  beforeUpload: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  beforeRemove: {
    type: Function as PropType<
      (
        uploadFile: UploadFile,
        uploadFiles: UploadFiles,
      ) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<
      (error: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<
      (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (e: uploadProgressEvent, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export const genId = () => uuidv4();
