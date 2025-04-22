import type { ExtractPropTypes, PropType } from "vue";
import { v4 as uuidv4 } from 'uuid';
const NOOP = () => { }

export interface UploadFile {
    uid?: string,
    name: string,
    url?: string,
    percentage?: number,
    raw?: File,
    size?: number,
    status: string
}

export type UploadFiles = UploadFile[];

export type UploadRawFile = File & { uid: string }

export const baseProps = {
    FileList: {
        type: Array as PropType<UploadFiles>,
        default: () => [] as const
    },
    action: {
        type: String,
        default: ''
    },
    multiple: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: 'file'
    },
    accept: {
        type: String,
        default: ''
    },
    method: {
        type: String,
        default: 'post'
    },
    headers: {
        type: Object,
        default: () => ({})
    },
    data: {
        type: Boolean,
        default: false
    }
} as const;

export const uploadProps = {
    ...baseProps,
    beforeUpload: {
        type: Function as PropType<(file: UploadRawFile) => Promise<boolean> | boolean>,
        default: NOOP
    },
    onChange: {
        type: Function as PropType<(file: UploadFile) => void>,
        default: NOOP
    },
    onRemove: {
        type: Function as PropType<(file: UploadRawFile) => void>,
        default: NOOP
    }
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export const genId = () => uuidv4();